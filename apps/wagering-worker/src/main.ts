import { NestFactory } from '@nestjs/core';
import { WageringWorkerModule } from './wagering-worker.module';

async function bootstrap() {
  const app = await NestFactory.create(WageringWorkerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
