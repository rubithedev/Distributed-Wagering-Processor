import { defineEntity, type InferEntity, p } from '@mikro-orm/core';

export enum WagerTransactionKind {
  Opening = 'OPENING',
  Bet = 'BET',
  Win = 'WIN',
  Loss = 'LOSS',
  Refund = 'REFUND',
  Rollback = 'ROLLBACK',
}

export enum WagerTransactionStatus {
  Pending = 'PENDING', // aceita, ainda não aplicada
  PendingReference = 'PENDING_REFERENCE', // aguardando a transação referenciada
  Processed = 'PROCESSED', // aplicada (terminal)
  Rejected = 'REJECTED', // violação de regra de negócio (terminal)
  Failed = 'FAILED', // erro permanente de infraestrutura (terminal, auditável)
}

export const WagerTransactionSchema = defineEntity({
  name: 'WagerTransaction',
  properties: {
    id: p.uuid().primary().defaultRaw('gen_random_uuid()'),

    providerId: p.text(),
    externalTransactionId: p.text(),
    payloadHash: p.text(),
    roundId: p.text(),
    gameId: p.text(),

    amount: p.text(),
    currency: p.string().default('BRL'),

    kind: p
      .enum(() => WagerTransactionKind)
      .nativeEnumName('wager_transaction_kind')
      .default(WagerTransactionKind.Bet),

    status: p
      .enum(() => WagerTransactionStatus)
      .nativeEnumName('wager_transaction_status')
      .default(WagerTransactionStatus.Pending),

    // Timestamps
    createdAt: p.datetime().defaultRaw('now()'),
    updatedAt: p
      .datetime()
      .defaultRaw('now()')
      .onUpdate(() => new Date()),
    deletedAt: p.datetime().nullable(),
  },
});

export type IWagerTransaction = InferEntity<typeof WagerTransactionSchema>;
