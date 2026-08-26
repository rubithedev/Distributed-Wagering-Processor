import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export const WalletSchema = defineEntity({
  name: 'Wallet',
  properties: {
    id: p.uuid().primary().defaultRaw('gen_random_uuid()'),
    playerId: p.uuid(),

    balance: p.string().default('0.0'),
    currency: p.string().default('BRL'),
    version: p.integer().default(1),

    // Timestamps
    createdAt: p.datetime().defaultRaw('now()'),
    updatedAt: p
      .datetime()
      .defaultRaw('now()')
      .onUpdate(() => new Date()),
    deletedAt: p.datetime().nullable(),
  },
});

export type IWallet = InferEntity<typeof WalletSchema>;
