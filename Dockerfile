# MapartCraft is a static React site: build it with Node, serve it with nginx.
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY public/ public/
COPY src/ src/
RUN npm run build

FROM nginx:1.27-alpine

COPY docker/default.conf /etc/nginx/conf.d/default.conf
# Daily access logs (read by GoAccess) and the generated statistics report;
# both are volumes in docker-compose.yml.
RUN mkdir -p /var/log/mapartcraft /var/www/stats && chown nginx:nginx /var/log/mapartcraft
# The app is built for /mapartcraft (package.json homepage, Router basename).
COPY --from=build /app/build/ /usr/share/nginx/html/mapartcraft/

EXPOSE 80
