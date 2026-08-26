import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';

async function bootstrap() {
  const port = process.env.GATEWAY_PORT || 3000;
  const app = await NestFactory.create(GatewayModule);
  await app.listen(port, () => {
    console.log('Gateway listening to:', port);
  });
}
void bootstrap();
