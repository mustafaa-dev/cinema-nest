import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CurrentUser, ProfileDto, Serialize, UserLoginDto } from '@app/common';
import { TokenPayloadInterface } from '@app/common/interfaces/token-payload.interface';
import { User } from './entities/user.entity';
import { JwtGuard } from '../../auth/src/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  @Serialize(ProfileDto)
  async getProfile(@CurrentUser() user: User) {
    return user;
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
}
