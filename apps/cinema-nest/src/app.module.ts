import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersModule } from 'apps/users/src/users.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailingModule } from '../../mailing/src/mailing.module';
import { MoviesModule } from '../../movies/src/movies.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        // DB_HOST: Joi.string().required(),
        // DB_PORT: Joi.number().required(),
        // DB_USERNAME: Joi.string().required(),
        // DB_PASSWORD: Joi.string().required(),
        // DB_NAME: Joi.string().required(),
      }),
    }),
    LoggerModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    MailingModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
