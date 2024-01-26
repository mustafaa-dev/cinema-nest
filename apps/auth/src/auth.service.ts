import {
  REGISTER_NEW_USER,
  UserRegistrationDto,
  UserVerificationDto,
  VALIDATE_USER,
  VERIFIED,
} from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from 'apps/users/src/users.service';
import { User } from '../../users/src/entities/user.entity';
import { TokenPayloadInterface } from '@app/common/interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { sendSuccess } from '@app/common/interfaces/response.interface';
import { addSeconds } from 'date-fns';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private ee: EventEmitter2,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userRegistrationDto: UserRegistrationDto) {
    return await this.ee.emitAsync(REGISTER_NEW_USER, userRegistrationDto);
  }

  async login(user: User) {
    const tokenPayload: TokenPayloadInterface = { id: user.id };
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() + +this.configService.get('JWT_EXPIRATION'),
    );
    return sendSuccess(await this.createUserToken(tokenPayload));
  }

  async verify({ code }: UserVerificationDto, user: User) {
    if (user.verified) throw new BadRequestException('User Already Verified');
    if (
      code === user.code &&
      addSeconds(new Date(), 1) < addSeconds(user.codeExpiration, 1)
    ) {
      return await this.ee.emitAsync(VERIFIED, user);
    } else {
      throw new BadRequestException('Invalid or Expired code');
    }
  }

  async validateUser(data: object) {
    return await this.ee.emitAsync(VALIDATE_USER, data);
  }

  async createUserToken(payload: TokenPayloadInterface) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });
  }
}
