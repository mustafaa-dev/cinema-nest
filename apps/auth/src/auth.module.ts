import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'apps/users/src/users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LocalStrategy } from './stratigies/auth.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './stratigies/jwt.strategy';
import { RoleRepository } from './repositories/role.repository';
import { PermissionRepository } from './repositories/permission.repository';
import { DatabaseModule } from '@app/common';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Role, Permission]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.getOrThrow<number>('JWT_EXPIRATION')}`,
        },
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    RoleRepository,
    PermissionRepository,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
