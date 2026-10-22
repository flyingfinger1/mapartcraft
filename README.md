# MapartCraft

A Minecraft mapart schematic and map.dat generator, designed to be feasible for both server admins and survival players on servers like 2b2t, running in your browser.

# Requirements

MapartCraft is a static website written in ReactJS; running and building requires NPM / Node. Extra scripts in `tools` are written in Python3. `tools/addColoursJSONBlock.py` optionally uses [ImageMagick](https://imagemagick.org/) to manage `src/images/textures.png`.

# Building

1. Acquire packages with `npm install`.
2. Build using `npm run build`, or run a debug version with `npm run start`.
3. Alternatively use the shell script `build.sh` for deployment on Linux. This will also copy a `.htaccess` file to the build folder for use with Apache.

The default build settings assume the app is being hosted at https://YOUR-SITE-HERE.com/mapartcraft. To change the folder from which the site is hosted modify the following:

- `homepage` in `package.json`
- `basename` in the Router in `src/app.js`
- The `RewriteRule` in `buildSources/apache/.htaccess` if using Apache

# Docker

The `Dockerfile` builds the site and serves it with nginx at `/mapartcraft/` (requests to `/` are redirected there). Publishing a GitHub release runs `.github/workflows/release.yml`, which pushes the image to `ghcr.io/flyingfinger1/mapartcraft` tagged with the version and `latest`. `docker-compose.yml` runs that image behind caddy-docker-proxy on the external `caddy-net` network; copy it to your server and replace `mapartcraft.example.com` with your domain:

```
docker compose pull
docker compose up -d
```

## Visitor statistics

nginx writes one access log per day to the `logs` volume, with the visitor's address taken from the proxy's `X-Forwarded-For` header. The `goaccess` service turns these logs into a report every 10 minutes (`REPORT_INTERVAL`) and deletes logs older than 30 days (`LOG_RETENTION_DAYS`), since they contain IP addresses. There is no tracking script and no cookie on the site; crawlers are left out of the report.

The report is served at `/stats/` behind a password. Create the password file next to `docker-compose.yml` before the first start (otherwise Docker creates a directory in its place and `/stats/` answers with an error):

```
printf 'admin:%s\n' "$(openssl passwd -apr1)" > stats.htpasswd
```

# Usage

This is a fork of [rebane2001/mapartcraft](https://github.com/rebane2001/mapartcraft) with support for Minecraft versions up to 26.3, more blocks, `.litematic` export and fewer support blocks in valley staircasing. Run it yourself with Docker (see above) or `npm run start`. Report bugs and feature requests for this fork in its [issue tracker](https://github.com/flyingfinger1/mapartcraft/issues).

The original is available at [rebane2001.com](https://rebane2001.com/mapartcraft).

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
