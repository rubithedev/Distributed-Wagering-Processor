import { Module } from '@nestjs/common';
import { WageringController } from './wagering.controller';
import { WageringService } from './wagering.service';

@Module({
  controllers: [WageringController],
  providers: [WageringService],
  exports: [WageringService],
})
export class WageringModule {}
