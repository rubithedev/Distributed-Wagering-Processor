import { Migration } from '@mikro-orm/migrations';

export class Migration20260826015346_Init_database extends Migration {

  override name = 'Migration20260826015346_Init_database';

  override up(): void | Promise<void> {
    this.addSql(`create table "wallet" ("id" uuid not null, primary key ("id"));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "wallet" cascade;`);
  }

}
