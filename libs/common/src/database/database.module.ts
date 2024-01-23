import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { config } from './config/data-source';
import { ConfigModule } from '@nestjs/config';

@Module({
  // imports: [
  //   TypeOrmModule.forRootAsync({
  //     useFactory: (configService: ConfigService) => ({
  //       host: configService.get('DB_HOST'),
  //       type: 'mysql',
  //       port: configService.get('DB_PORT'),
  //       username: configService.get('DB_USERNAME'),
  //       password: configService.get('DB_PASSWORD'),
  //       database: configService.get('DB_NAME'),
  //       autoLoadEntities: true,
  //       migrations: [join(__dirname, 'migrations', '**', '*.{ts,js}')],
  //     }),
  //     inject: [ConfigService],
  //   }),
  // ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(config),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
