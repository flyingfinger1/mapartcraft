/*
  Reduces an image to the map size with a triangle filter, in linear light and with premultiplied alpha. Browsers average
  in sRGB, which darkens fine detail, scale differently from browser to browser and let more moiré through. Enlarging is
  left to the browser.
*/

const SRGB_TO_LINEAR = new Float32Array(256);
for (let i = 0; i < 256; i++) {
  const c = i / 255;
  SRGB_TO_LINEAR[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgbByte(v) {
  const c = v <= 0 ? 0 : v >= 1 ? 1 : v;
  return Math.round(255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055));
}

// For every destination pixel along one axis: the source pixels it uses and their weights. The weights fall off linearly
// up to one destination pixel away (a triangle filter); compared with a plain average of the covered area this keeps
// edges just as sharp and lets about five times less moiré through.
function coverage(sourceLength, destinationLength) {
  const scale = sourceLength / destinationLength;
  const result = [];
  for (let d = 0; d < destinationLength; d++) {
    const centre = (d + 0.5) * scale;
    const first = Math.max(0, Math.floor(centre - scale));
    const last = Math.min(sourceLength - 1, Math.ceil(centre + scale));
    const weights = [];
    let total = 0;
    for (let s = first; s <= last; s++) {
      const weight = Math.max(0, 1 - Math.abs(s + 0.5 - centre) / scale);
      weights.push(weight);
      total += weight;
    }
    result.push({ first, weights: weights.map((weight) => weight / total) });
  }
  return result;
}

function boxResample(source, sourceWidth, sourceHeight, destinationWidth, destinationHeight) {
  // premultiplied linear RGB and alpha, as floats
  const linear = new Float32Array(sourceWidth * sourceHeight * 4);
  for (let i = 0; i < sourceWidth * sourceHeight; i++) {
    const alpha = source[4 * i + 3] / 255;
    linear[4 * i] = SRGB_TO_LINEAR[source[4 * i]] * alpha;
    linear[4 * i + 1] = SRGB_TO_LINEAR[source[4 * i + 1]] * alpha;
    linear[4 * i + 2] = SRGB_TO_LINEAR[source[4 * i + 2]] * alpha;
    linear[4 * i + 3] = alpha;
  }
  // horizontal pass, then vertical pass
  const columns = coverage(sourceWidth, destinationWidth);
  const horizontal = new Float32Array(destinationWidth * sourceHeight * 4);
  for (let y = 0; y < sourceHeight; y++) {
    for (let x = 0; x < destinationWidth; x++) {
      const { first, weights } = columns[x];
      const out = 4 * (y * destinationWidth + x);
      for (let k = 0; k < weights.length; k++) {
        const inp = 4 * (y * sourceWidth + first + k);
        for (let c = 0; c < 4; c++) horizontal[out + c] += linear[inp + c] * weights[k];
      }
    }
  }
  const rows = coverage(sourceHeight, destinationHeight);
  const result = new Uint8ClampedArray(destinationWidth * destinationHeight * 4);
  for (let y = 0; y < destinationHeight; y++) {
    const { first, weights } = rows[y];
    for (let x = 0; x < destinationWidth; x++) {
      const sum = [0, 0, 0, 0];
      for (let k = 0; k < weights.length; k++) {
        const inp = 4 * ((first + k) * destinationWidth + x);
        for (let c = 0; c < 4; c++) sum[c] += horizontal[inp + c] * weights[k];
      }
      const out = 4 * (y * destinationWidth + x);
      const alpha = sum[3];
      result[out] = alpha > 0 ? linearToSrgbByte(sum[0] / alpha) : 0;
      result[out + 1] = alpha > 0 ? linearToSrgbByte(sum[1] / alpha) : 0;
      result[out + 2] = alpha > 0 ? linearToSrgbByte(sum[2] / alpha) : 0;
      result[out + 3] = Math.round(255 * alpha);
    }
  }
  return result;
}

/*
  Draws the source rectangle of image into ctx, filling the whole canvas. prepare(context) is called on the drawing
  context before the image is drawn (background, filters). Returns false when the image is not reduced in either
  direction, so the caller can draw it the usual way.
*/
export function drawReduced(ctx, image, sourceX, sourceY, sourceWidth, sourceHeight, prepare) {
  const destinationWidth = ctx.canvas.width;
  const destinationHeight = ctx.canvas.height;
  if (sourceWidth <= destinationWidth && sourceHeight <= destinationHeight) {
    return false;
  }
  // very large images are first brought to at most 8 source pixels per map pixel and direction by the browser, and to at
  // most 16 million pixels, which keeps the memory for the filter in bounds
  let intermediateWidth = Math.max(destinationWidth, Math.min(sourceWidth, 8 * destinationWidth));
  let intermediateHeight = Math.max(destinationHeight, Math.min(sourceHeight, 8 * destinationHeight));
  const pixelLimit = 16000000;
  if (intermediateWidth * intermediateHeight > pixelLimit) {
    const shrink = Math.sqrt(pixelLimit / (intermediateWidth * intermediateHeight));
    intermediateWidth = Math.max(destinationWidth, Math.floor(intermediateWidth * shrink));
    intermediateHeight = Math.max(destinationHeight, Math.floor(intermediateHeight * shrink));
  }
  const intermediate = document.createElement("canvas");
  intermediate.width = intermediateWidth;
  intermediate.height = intermediateHeight;
  const intermediateContext = intermediate.getContext("2d");
  intermediateContext.imageSmoothingEnabled = true;
  intermediateContext.imageSmoothingQuality = "high";
  prepare(intermediateContext);
  intermediateContext.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, intermediateWidth, intermediateHeight);
  const reduced = boxResample(
    intermediateContext.getImageData(0, 0, intermediateWidth, intermediateHeight).data,
    intermediateWidth,
    intermediateHeight,
    destinationWidth,
    destinationHeight
  );
  ctx.putImageData(new ImageData(reduced, destinationWidth, destinationHeight), 0, 0);
  return true;
}
