import { Migration } from '@mikro-orm/migrations';

export class Migration20260826171750_create_ledger_and_wager_transaction_tables extends Migration {

  override name = 'Migration20260826171750_create_ledger_and_wager_transaction_tables';

  override up(): void | Promise<void> {
    this.addSql(`create type "wager_transaction_kind" as enum ('OPENING', 'BET', 'WIN', 'LOSS', 'REFUND', 'ROLLBACK');`);
    this.addSql(`create type "wager_transaction_status" as enum ('PENDING', 'PENDING_REFERENCE', 'PROCESSED', 'REJECTED', 'FAILED');`);
    this.addSql(`create table "ledger" ("id" uuid not null default gen_random_uuid(), "wallet_id" uuid not null, "transaction_id" uuid not null, "amount" text not null, "currency" varchar(255) not null default 'BRL', "direction" text not null, "created_at" timestamptz not null default now(), primary key ("id"));`);

    this.addSql(`create table "wager_transaction" ("id" uuid not null default gen_random_uuid(), "provider_id" text not null, "external_transaction_id" text not null, "payload_hash" text not null, "round_id" text not null, "game_id" text not null, "amount" text not null, "currency" varchar(255) not null default 'BRL', "kind" "wager_transaction_kind" not null default 'BET', "status" "wager_transaction_status" not null default 'PENDING', "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, primary key ("id"));`);

    this.addSql(`alter table "ledger" add constraint "ledger_direction_check" check ("direction" in ('DEBIT', 'CREDIT'));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "ledger" cascade;`);
    this.addSql(`drop table if exists "wager_transaction" cascade;`);

    this.addSql(`drop type "wager_transaction_kind";`);
    this.addSql(`drop type "wager_transaction_status";`);
  }

}
