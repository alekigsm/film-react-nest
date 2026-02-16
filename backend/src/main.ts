import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({});
  app.setGlobalPrefix('api/afisha');
  app.useGlobalPipes(new ValidationPipe({}));

  // Настраиваем Swagger БЕЗ учета глобального префикса
  const config = new DocumentBuilder()
    .setTitle('Мой фильмапроект')
    .setDescription('Практикум Films')
    .setVersion('1.0')
    .addServer('http://localhost:3000/') // Указываем полный путь с префиксом
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false, // Игнорируем глобальный префикс для Swagger
  });

  // Swagger доступен по /api/docs (без префикса afisha)
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: http://localhost:3000/api/afisha`);
  console.log(`Swagger documentation: http://localhost:3000/api/docs`);
}
bootstrap();
