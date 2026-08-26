import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { WalletSchema } from './entities/wallet.entity';
import { WagerTransactionSchema } from './entities/wager-transaction.entity';
import { LedgerSchema } from './entities/ledger.entity';

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

  entities: [WalletSchema, WagerTransactionSchema, LedgerSchema],

  // TODO: Remove.
  debug: mikroormDebugMode,
});

export default config;
