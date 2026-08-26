import { Test, TestingModule } from '@nestjs/testing';
import { WageringWorkerController } from './wagering-worker.controller';
import { WageringWorkerService } from './wagering-worker.service';

describe('WageringWorkerController', () => {
  let wageringWorkerController: WageringWorkerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WageringWorkerController],
      providers: [WageringWorkerService],
    }).compile();

    wageringWorkerController = app.get<WageringWorkerController>(
      WageringWorkerController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(wageringWorkerController.getHello()).toBe('Hello World!');
    });
  });
});
