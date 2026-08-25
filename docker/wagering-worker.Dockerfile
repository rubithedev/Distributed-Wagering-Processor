FROM oven/bun:1.4.0-alpine AS build
WORKDIR /build

COPY ./*.json ./
COPY apps ./apps
COPY libs ./libs

RUN bun install --frozen-lockfile
RUN bun run build wagering-worker

FROM oven/bun:1.4.0-alpine as app
WORKDIR /app

COPY --from=build /build/dist ./dist
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

CMD [ "bun", "run", "dist/apps/wagering-worker/main.js" ]
