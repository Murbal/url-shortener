# Client
FROM node:16-slim as client

WORKDIR /code
COPY docker/install-pnpm docker/pnpm-v6.16.js /scripts/
RUN ../scripts/install-pnpm

COPY client/package.json client/pnpm-lock.yaml /code/
RUN pnpm install

COPY client /code/
RUN pnpm build

# Nginx
FROM nginx

ARG API_HOST
ARG API_PORT
ARG SERVER_NAME
ARG SHORT_LINK_SERVER_NAME

COPY docker/web/default.conf.template /etc/nginx/conf.d/default.conf.template
RUN envsubst '${API_HOST} ${API_PORT} ${SERVER_NAME} ${SHORT_LINK_SERVER_NAME}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
COPY --from=client /code/dist /usr/share/nginx/html