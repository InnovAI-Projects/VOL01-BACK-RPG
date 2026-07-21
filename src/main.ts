import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('VOL01-BACK-RPG')
    .setDescription('The rpg manager API and it´s endpoints')
    .setVersion('1.0')
    .addTag('rpg')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  SwaggerModule.setup('api/swagger', app, documentFactory);
  await app.listen(process.env.PORT!);
}
bootstrap();
