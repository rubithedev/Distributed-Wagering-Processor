set -e

CONFIG_PATH="./libs/database/src/mikro-orm.config.ts"

apply_mikroorm_migrations() {
  bun mikro-orm migration:up \
    --config "$CONFIG_PATH"
}

apply_mikroorm_migrations
