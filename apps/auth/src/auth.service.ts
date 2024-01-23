import { REGISTER_NEW_USER, UserRegistrationDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UsersService } from 'apps/users/src/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private ee: EventEmitter2,
  ) {}

  async register(userRegistrationDto: UserRegistrationDto) {
    return this.ee.emit(REGISTER_NEW_USER, userRegistrationDto);
  }
}
