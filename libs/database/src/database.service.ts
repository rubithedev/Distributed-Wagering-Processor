import { MikroORM } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { config } from './mikro-orm.config';

@Injectable()
export class DatabaseService {
  constructor(private orm: MikroORM) {}

  async init() {
    // TODO: Use a config service.
    const databaseURL = process.env.POSTGRES_CONNECTION_STRING || undefined;
    const sshConnection = process.env.POSTGRES_SSH_CONNECTION === 'true';

    this.orm = await MikroORM.init({
      ...config,
      clientUrl: databaseURL,
      driverOptions:
        (sshConnection && {
          connection: {
            ssl: { rejectUnauthorized: false }, // Customize based on your provider
          },
        }) ||
        undefined,
    });
  }

  getORM(): MikroORM {
    return this.orm;
  }
}
