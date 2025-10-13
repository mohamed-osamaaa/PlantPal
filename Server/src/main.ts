import {
  existsSync,
  mkdirSync,
} from 'fs';
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    // origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const uploadPath = process.env.VERCEL ? '/tmp/uploads' : join(process.cwd(), 'uploads');
  if (!existsSync(uploadPath)) {
    try {
      mkdirSync(uploadPath, { recursive: true });
    } catch {
      // ignore mkdir failures on read-only FS
    }
  }

  if (existsSync(uploadPath)) {
    app.useStaticAssets(uploadPath, {
      prefix: '/uploads/',
    });

    const port = process.env.PORT ?? 3000;
    await app.listen(port, '0.0.0.0');
    console.log(`Server is running on http://localhost:${port}`);
  }
}
bootstrap();
