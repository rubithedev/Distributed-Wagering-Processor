#!/bin/bash

set -e

MIGRATION_NAME=""
CONFIG_PATH="./libs/database/src/mikro-orm.config.ts"

usage() {
  echo "Usage: "
  echo "  -n, --name STR    Specify the migration name"
}

load_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -n|--name)
        if [[ -z "${2:-}" ]]; then
          echo "Missing value for $1"
          usage
          exit 1
        fi

        MIGRATION_NAME="$2"
        shift 2
        ;;
      -h|--help)
        usage
        exit 0
        ;;
      *)
        echo "Invalid argument $1"
        usage
        exit 1
    esac
  done

    if [[ -z "$MIGRATION_NAME" ]]; then
      echo "Missing name"
      usage
      exit 1
    fi
}

create_mikroorm_migration() {
  bun mikro-orm migration:create \
    --config "$CONFIG_PATH" \
    --name "$MIGRATION_NAME"
}

load_args "$@"
create_mikroorm_migration
