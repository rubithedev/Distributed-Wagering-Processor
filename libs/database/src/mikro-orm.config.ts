import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { WalletSchema } from './entities/wallet.entity';

// Yep, should be true as far as it's told to be false
const mikroormDebugMode =
  process.env.MIRKO_ORM_DEBUG_MODE === 'false' ? false : true;

export const config = defineConfig({
  // Not in a env variable because this config should be usable by the migratuon
  // scripts.
  dbName: 'wagering_db',
  extensions: [Migrator],

  migrations: {
    path: './libs/database/migrations',
    pathTs: './libs/database/migrations',
  },

  entities: [WalletSchema],

  // TODO: Remove.
  debug: mikroormDebugMode,
});

export default config;
