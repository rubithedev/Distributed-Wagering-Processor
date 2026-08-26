import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),

        MIRKO_ORM_DEBUG_MODE: Joi.string().required(),
        POSTGRES_SSH_CONNECTION: Joi.string().required(),
        POSTGRES_CONNECTION_STRING: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),

        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        SQS_ENDPOINT: Joi.string().required(),
      }),
    }),
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
