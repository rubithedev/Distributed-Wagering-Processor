FROM oven/bun:1.4.0-alpine AS build
WORKDIR /build

COPY ./*.json ./
COPY apps ./apps
COPY libs ./libs

RUN bun install --frozen-lockfile
RUN bun run build gateway

FROM oven/bun:1.4.0-alpine
WORKDIR /app

COPY --from=build /build/dist ./dist
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

ARG GATEWAY_PORT
ENV GATEWAY_PORT=${GATEWAY_PORT}
EXPOSE ${GATEWAY_PORT}

CMD [ "bun", "run", "dist/apps/gateway/main.js" ]
