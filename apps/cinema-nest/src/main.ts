import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getOrThrow<number>('PORT');
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(new ApiGatewayErrorFilter());
  // app.useGlobalGuards(new JwtGuard(new Reflector()));
  await app.listen(PORT);
}

bootstrap();
