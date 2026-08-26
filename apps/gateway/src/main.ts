import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const port = process.env.GATEWAY_PORT || 3000;

  const configApiDoc = new DocumentBuilder()
    .setTitle('Distributed Wagering Processor')
    .setDescription('The Gateway API')
    .setVersion('0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addServer('http://localhost:{PORT}', 'Local Environment', {
      PORT: { default: port },
    })
    .build();

  const app = await NestFactory.create(GatewayModule, {
    // Allow everything from everywhere.
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    },
  });

  if (process.env.ENABLE_API_DOC === 'true') {
    const document = SwaggerModule.createDocument(app, configApiDoc);
    writeFileSync('./swagger-docs/openapi.json', JSON.stringify(document));
    SwaggerModule.setup('api-docs', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(port, () => {
    console.log('Gateway listening to:', port);
  });
}
void bootstrap();
