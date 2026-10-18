# MapartCraft is a static React site: build it with Node, serve it with nginx.
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY public/ public/
COPY src/ src/
# react-scripts 4 (webpack 4) needs the legacy OpenSSL provider on Node 17+.
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/default.conf /etc/nginx/conf.d/default.conf
# The app is built for /mapartcraft (package.json homepage, Router basename).
COPY --from=build /app/build/ /usr/share/nginx/html/mapartcraft/

EXPOSE 80
