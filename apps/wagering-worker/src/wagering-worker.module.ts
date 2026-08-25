import { Module } from '@nestjs/common';
import { WageringWorkerController } from './wagering-worker.controller';
import { WageringWorkerService } from './wagering-worker.service';

@Module({
  imports: [],
  controllers: [WageringWorkerController],
  providers: [WageringWorkerService],
})
export class WageringWorkerModule {}
