import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerMiddle } from './middlewares/loggerGlobal';
import { ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import { authZeroConfig } from './config/auth0.config';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(authZeroConfig));
  app.use(loggerMiddle);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    session({
      secret: process.env.AUTH0_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription(
      'API para ecommerce de productos, proyecto para módulo 4 Backend Henry',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
