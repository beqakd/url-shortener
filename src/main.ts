import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.setGlobalPrefix('');

  const configBuilder = new DocumentBuilder()
    .setTitle('Url Shortener Swagger API')
    .setDescription('The Url Shortener API description')
    .setVersion('1.0');

  if (process.env['SWAGGER_BASE_PATH'] !== undefined) {
    configBuilder.addServer(process.env['SWAGGER_BASE_PATH']);
    console.log(
      `[Swagger UI] Adding base path: ${process.env['SWAGGER_BASE_PATH']}`,
    );
  }
  const config = configBuilder.build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/url-shortener/docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  console.log('Server is running...');
  console.log(
    `[Swagger UI] http://localhost:${process.env.PORT ?? 3000}/url-shortener/docs`,
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
