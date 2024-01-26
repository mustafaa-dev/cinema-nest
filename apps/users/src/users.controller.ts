import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  CurrentUser,
  GET_PROFILE,
  ProfileDto,
  REGISTER_NEW_USER,
  Serialize,
  UserLoginDto,
  UserRegistrationDto,
  VALIDATE_USER,
  VERIFIED,
} from '@app/common';
import { TokenPayloadInterface } from '@app/common/interfaces/token-payload.interface';
import { User } from './entities/user.entity';
import { JwtGuard } from '../../auth/src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  @Serialize(ProfileDto)
  async getProfile(@CurrentUser() user: User) {
    return user;
  }

  async registerNewUser(userRegistrationDto: UserRegistrationDto) {
    return await this.usersService.register(userRegistrationDto);
  }

  async validateUserData(userLoginDto: UserLoginDto) {
    return await this.usersService.validateUserData(userLoginDto);
  }

  async getUserProfileBy(data: TokenPayloadInterface) {
    return await this.usersService.getUserProfileBy(data);
  }

  async updateUser(user: any, update: any) {
    return await this.usersService.updateUser(user, update);
  }

  handleEvents() {
    this.ee.on(REGISTER_NEW_USER, async (data) => {
      return await this.registerNewUser(data);
    });
    this.ee.on(VALIDATE_USER, async (data) => {
      return await this.validateUserData(data);
    });
    this.ee.on(GET_PROFILE, async (data) => {
      return await this.getUserProfileBy(data);
    });
    this.ee.on(VERIFIED, async (data) => {
      return await this.updateUser(data, {
        verified: true,
        code: null,
        codeExpiration: null,
      });
    });
  }
}
