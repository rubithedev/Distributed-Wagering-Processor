import { Migration } from '@mikro-orm/migrations';

export class Migration20260826030203_wallet_ID_uses_gen_random_uuid_as_default extends Migration {

  override name = 'Migration20260826030203_wallet_ID_uses_gen_random_uuid_as_default';

  override up(): void | Promise<void> {
    this.addSql(`alter table "wallet" alter column "id" set default gen_random_uuid();`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "wallet" alter column "id" drop default;`);
  }

}
