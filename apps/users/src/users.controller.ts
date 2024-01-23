import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { REGISTER_NEW_USER, UserRegistrationDto } from '@app/common';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private ee: EventEmitter2,
  ) {}

  @OnEvent(REGISTER_NEW_USER, { async: true })
  async registerNewUser(userRegistrationDto: UserRegistrationDto) {
    return await this.usersService.register(userRegistrationDto);
  }
}
