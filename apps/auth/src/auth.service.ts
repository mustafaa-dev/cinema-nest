import {
  UserLoginDto,
  UserRegistrationDto,
  UserVerificationDto,
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
import { RoleRepository } from './repositories/role.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleRepository: RoleRepository,
    private ee: EventEmitter2,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userRegistrationDto: UserRegistrationDto) {
    const role = await this.roleRepository.findOne({ where: { name: 'user' } });
    return await this.usersService.register(userRegistrationDto, role);
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
      return await this.usersService.updateUser(user, {
        verified: true,
        code: null,
        codeExpiration: null,
      });
    } else {
      throw new BadRequestException('Invalid or Expired code');
    }
  }

  async validateUser(userLoginDto: UserLoginDto) {
    return await this.usersService.validateUserData(userLoginDto);
  }

  async createUserToken(payload: TokenPayloadInterface) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRATION'),
    });
  }
}
