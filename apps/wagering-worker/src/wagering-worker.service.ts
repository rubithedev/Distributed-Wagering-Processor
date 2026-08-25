import { Injectable } from '@nestjs/common';

@Injectable()
export class WageringWorkerService {
  getHello(): string {
    return 'Hello World!';
  }
}
