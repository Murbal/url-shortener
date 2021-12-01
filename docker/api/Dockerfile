FROM node:16-slim
WORKDIR /code

COPY docker/install-pnpm docker/pnpm-v6.16.js /scripts/
RUN ../scripts/install-pnpm

COPY api/package.json api/pnpm-lock.yaml /code/
RUN pnpm install

COPY api /code/
RUN pnpm build
CMD ["node", "dist"]