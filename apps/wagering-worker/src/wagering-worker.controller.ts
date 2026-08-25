import { Controller, Get } from '@nestjs/common';
import { WageringWorkerService } from './wagering-worker.service';

@Controller()
export class WageringWorkerController {
  constructor(private readonly wageringWorkerService: WageringWorkerService) {}

  @Get()
  getHello(): string {
    return this.wageringWorkerService.getHello();
  }
}
