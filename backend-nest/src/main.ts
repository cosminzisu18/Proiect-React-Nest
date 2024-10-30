import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path'; 
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const uploadDir = join(__dirname, '..', 'uploads'); 
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir); 
  }

  // CORS
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useStaticAssets(uploadDir, { prefix: '/uploads' });


  await app.listen(3002);
}
bootstrap();
