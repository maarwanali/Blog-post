import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cors({
      origin: process.env.BFF, // Replace with your frontend URL
      credentials: true, // Set to true if your API uses cookies or authorization headers
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());
  await app.listen(3333);
}
bootstrap();
