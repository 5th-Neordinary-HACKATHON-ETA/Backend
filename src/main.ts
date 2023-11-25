import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Exception } from './common/response/exception';
import { ExceptionHandler } from './common/response/exception.handler';
import { RESPONSE_CODE } from './common/response/response.code';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const message = errors.map((error) => error.toString()).join();
        return new Exception(RESPONSE_CODE[4000], { message });
      },
    }),
  );
  app.useGlobalFilters(new ExceptionHandler());
  await app.listen(3000);
}
bootstrap();
