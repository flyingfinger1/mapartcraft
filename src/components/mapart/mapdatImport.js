import { ungzip } from "pako";

/*
  Reads a Minecraft map file (map_<id>.dat: gzipped NBT with a 128x128 byte array data.colors) and turns it into an image
  in the exact map colours. Each byte is 4 * base colour + shade (0 dark, 1 normal, 2 light, 3 darkest); base colour 0 is
  transparent. The image then goes through MapartCraft like any other, so with the matching blocks selected every pixel
  maps back to exactly one block.
*/

const TONES = ["dark", "normal", "light", "unobtainable"];

export function isMapdatFile(file) {
  return /\.dat$/i.test(file.name);
}

// minimal NBT reader: returns the root compound as a plain object, byte arrays as Int8Array
function readNBT(bytes) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 0;
  const readString = () => {
    const length = view.getUint16(offset);
    offset += 2;
    const text = new TextDecoder().decode(bytes.subarray(offset, offset + length));
    offset += length;
    return text;
  };
  const readPayload = (type) => {
    switch (type) {
      case 1:
        return view.getInt8(offset++);
      case 2: {
        const value = view.getInt16(offset);
        offset += 2;
        return value;
      }
      case 3: {
        const value = view.getInt32(offset);
        offset += 4;
        return value;
      }
      case 4: {
        const value = view.getBigInt64(offset);
        offset += 8;
        return value;
      }
      case 5: {
        const value = view.getFloat32(offset);
        offset += 4;
        return value;
      }
      case 6: {
        const value = view.getFloat64(offset);
        offset += 8;
        return value;
      }
      case 7: {
        const length = view.getInt32(offset);
        offset += 4;
        const value = new Int8Array(bytes.buffer.slice(bytes.byteOffset + offset, bytes.byteOffset + offset + length));
        offset += length;
        return value;
      }
      case 8:
        return readString();
      case 9: {
        const elementType = view.getInt8(offset++);
        const length = view.getInt32(offset);
        offset += 4;
        const list = [];
        for (let i = 0; i < length; i++) list.push(readPayload(elementType));
        return list;
      }
      case 10: {
        const compound = {};
        for (;;) {
          const tagType = view.getInt8(offset++);
          if (tagType === 0) return compound;
          const name = readString();
          compound[name] = readPayload(tagType);
        }
      }
      case 11:
      case 12: {
        const length = view.getInt32(offset);
        offset += 4;
        const list = [];
        for (let i = 0; i < length; i++) list.push(readPayload(type === 11 ? 3 : 4));
        return list;
      }
      default:
        throw new Error(`Unknown NBT tag type ${type}`);
    }
  };
  const rootType = view.getInt8(offset++);
  if (rootType !== 10) throw new Error("Not an NBT file");
  readString();
  return readPayload(10);
}

// returns { imageURL: PNG data URL of the map, hasTransparency }, or throws when the file is no map
export async function mapdatFileToImageURL(file, coloursJSON) {
  let bytes = new Uint8Array(await file.arrayBuffer());
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    bytes = ungzip(bytes);
  }
  const root = readNBT(bytes);
  const colors = root.data && root.data.colors;
  if (!(colors instanceof Int8Array) || colors.length !== 128 * 128) {
    throw new Error("No map colours in this file");
  }
  const rgbByMapdatByte = new Map();
  for (const colourSet of Object.values(coloursJSON)) {
    TONES.forEach((tone, shade) => rgbByMapdatByte.set(4 * colourSet.mapdatId + shade, colourSet.tonesRGB[tone]));
  }
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.createImageData(128, 128);
  let hasTransparency = false;
  for (let i = 0; i < 128 * 128; i++) {
    const rgb = rgbByMapdatByte.get(colors[i] & 0xff); // colours of base colour 0 (and unknown ones) stay transparent
    if (rgb !== undefined) {
      imageData.data[4 * i] = rgb[0];
      imageData.data[4 * i + 1] = rgb[1];
      imageData.data[4 * i + 2] = rgb[2];
      imageData.data[4 * i + 3] = 255;
    } else {
      hasTransparency = true;
    }
  }
  ctx.putImageData(imageData, 0, 0);
  return { imageURL: canvas.toDataURL("image/png"), hasTransparency: hasTransparency };
}
