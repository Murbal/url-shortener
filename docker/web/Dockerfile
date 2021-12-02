# Client
FROM node:16-slim as client

ARG VITE_SHORT_LINK_DOMAIN

WORKDIR /code
COPY docker/install-pnpm docker/pnpm-v6.16.js /scripts/
RUN ../scripts/install-pnpm

COPY client/package.json client/pnpm-lock.yaml /code/
RUN pnpm install

COPY client /code/
RUN pnpm build

# Nginx
FROM nginx

ARG API_SERVICE_HOST
ARG API_SERVICE_PORT
ARG API_SERVER_PORT
ARG SERVER_PORT

COPY docker/web/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN envsubst '$API_SERVICE_HOST $API_SERVICE_PORT $API_SERVER_PORT $SERVER_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
COPY --from=client /code/dist /usr/share/nginx/html