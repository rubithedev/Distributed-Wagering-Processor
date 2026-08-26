import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { WalletSchema } from "./entities/wallet.entity";

export const config = defineConfig({
  dbName: "wagering_db",
  extensions: [Migrator],

  migrations: {
    path: "./libs/database/migrations",
    pathTs: "./libs/database/migrations",
  },

  entities: [WalletSchema],

  // TODO: Remove.
  debug: true,
});

export default config;
