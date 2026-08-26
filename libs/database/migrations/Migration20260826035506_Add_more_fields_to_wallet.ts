import { Migration } from '@mikro-orm/migrations';

export class Migration20260826035506_Add_more_fields_to_wallet extends Migration {

  override name = 'Migration20260826035506_Add_more_fields_to_wallet';

  override up(): void | Promise<void> {
    this.addSql(`alter table "wallet" add "player_id" uuid not null, add "balance" varchar(255) not null default '0.0', add "currency" varchar(255) not null default 'BRL', add "version" int not null default 1, add "created_at" timestamptz not null default now(), add "updated_at" timestamptz not null default now(), add "deleted_at" timestamptz null;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "wallet" drop column "player_id", drop column "balance", drop column "currency", drop column "version", drop column "created_at", drop column "updated_at", drop column "deleted_at";`);
  }

}
