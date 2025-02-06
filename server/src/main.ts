import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

const SERVER_PORT = 3030
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Baseball Dairy API')
    .setDescription('Basball Dairy API Swagger')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  SwaggerModule.setup(
    'api-doc',
    app,
    SwaggerModule.createDocument(app, config),
    {
      swaggerOptions: {
        persistAuthorization: true,
      },
    },
  );

  app.setGlobalPrefix('api');
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors(); // CORS 활성화
  await app.listen(SERVER_PORT);
  console.log(
    `[Baseball Dairy] Server is on ${process.env.PROTOCOL}://${process.env.APP_HOST}:${SERVER_PORT}/ad`,
  );
  console.log(
    `[Baseball Dairy] Swagger is on ${process.env.PROTOCOL}://${process.env.APP_HOST}:${SERVER_PORT}/api-doc`,
  );
}
bootstrap();
