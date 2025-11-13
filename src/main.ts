import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './errors/http-exception/http-exception.filter';
import { CustomExceptionFilter } from './errors/custom-exception/custom-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter(), new CustomExceptionFilter());
  await app.listen(3000);
}
bootstrap();
