import { UserRegistrationDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userRegistrationDto: UserRegistrationDto) {
    const newUser = new User();
    Object.assign(newUser, userRegistrationDto);
    return await this.userRepository.create(newUser);
  }
}
