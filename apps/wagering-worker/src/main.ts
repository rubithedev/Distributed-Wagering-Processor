import { NestFactory } from "@nestjs/core";
import { WageringWorkerModule } from "./wagering-worker.module";

async function bootstrap() {
  const port = process.env.WAGERING_WORKER_PORT || 3001;
  const app = await NestFactory.create(WageringWorkerModule);
  await app.listen(port, () => {
    console.log("Wagering Worker listening to:", port);
  });
}
bootstrap();
