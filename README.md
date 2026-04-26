# MapartCraft

A Minecraft mapart schematic and map.dat generator, designed to be feasible for both server admins and survival players on servers like 2b2t, running in your browser.

# Requirements

MapartCraft is a static website written in ReactJS; running and building requires NPM / Node. Extra scripts in `tools` are written in Python3. `tools/addColoursJSONBlock.py` optionally uses [ImageMagick](https://imagemagick.org/) to manage `src/images/textures.png`.

# Building

1. Acquire packages with `npm install`.
2. Build using `npm run build`, or run a debug version with `npm run start`.
3. Alternatively use the shell script `build.sh` for deployment on Linux. This will also copy a `.htaccess` file to the build folder for use with Apache.

On Node 17 or newer, `react-scripts` 4 needs the legacy OpenSSL provider: set `NODE_OPTIONS=--openssl-legacy-provider` before building or starting.

The default build settings assume the app is being hosted at https://YOUR-SITE-HERE.com/mapartcraft. To change the folder from which the site is hosted modify the following:

- `homepage` in `package.json`
- `basename` in the Router in `src/app.js`
- The `RewriteRule` in `buildSources/apache/.htaccess` if using Apache

# Docker

The `Dockerfile` builds the site and serves it with nginx at `/mapartcraft/` (requests to `/` are redirected there). Publishing a GitHub release runs `.github/workflows/release.yml`, which pushes the image to `ghcr.io/flyingfinger1/mapartcraft` tagged with the version and `latest`. `docker-compose.yml` runs that image behind caddy-docker-proxy on the external `caddy-net` network:

```
docker compose pull
docker compose up -d
```

# Usage

Visit [MapartCraft](https://rebane2001.com/mapartcraft) on [rebane2001.com](https://rebane2001.com) or use a mirror on [web.archive.org](https://web.archive.org/web/*/https://rebane2001.com/mapartcraft). However, it is recommended to use the [rebane2001.com](https://rebane2001.com/mapartcraft) site as it is always up to date with new features and bugfixes.

# Credits/Thanks

- Minecraft for the block textures
- [KenPixel Mini Square](https://opengameart.org/content/kenney-fonts) font by [Kenney](https://www.kenney.nl/)
- [pako](https://www.npmjs.com/package/pako)'s zipping library
- [jszip](https://www.npmjs.com/package/jszip)'s zipping library
- [OpenMoji](https://github.com/hfg-gmuend/openmoji) for flags
- Translation credits can be seen on the translated pages
- [SelfAdjointOperator](https://github.com/SelfAdjointOperator) for some extra features
- [@cartographer/litematica](https://github.com/julienvincent/cartographer/tree/master/packages/litematica) for litematica support
- Code contributors can be seen on the [contributions page](https://github.com/rebane2001/mapartcraft/graphs/contributors)
