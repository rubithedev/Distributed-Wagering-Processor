import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export const LedgerSchema = defineEntity({
  name: 'Ledger',
  properties: {
    id: p.uuid().primary().defaultRaw('gen_random_uuid()'),

    walletId: p.uuid(),
    transactionId: p.uuid(),

    amount: p.text(),
    currency: p.string().default('BRL'),

    direction: p.enum(['DEBIT', 'CREDIT']),

    createdAt: p.datetime().defaultRaw('now()'),
  },
});

export type ILedger = InferEntity<typeof LedgerSchema>;
