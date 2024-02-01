import {
  generateNumber,
  UserLoginDto,
  UserRegistrationDto,
  VERIFICATION_CODE,
} from '@app/common';
import {
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { User } from './entities/user.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { compare } from 'bcryptjs';
import { Role } from '../../auth/src/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private ee: EventEmitter2,
  ) {}

  async register(userRegistrationDto: UserRegistrationDto, role: Role) {
    const newUser = new User();
    Object.assign(newUser, userRegistrationDto);
    newUser.role = role;
    const code = parseInt(await generateNumber(6));
    newUser.code = code;
    const user = await this.userRepository.create(newUser);
    this.ee.emit(VERIFICATION_CODE, {
      email: user.email,
      code,
    });
    return user;
  }

  async updateUser(user: User, update: any) {
    return await this.userRepository.findOneAndUpdate({ id: user.id }, update);
  }

  async validateUserData(userLoginDto: UserLoginDto) {
    const user = await this.getUserProfileBy({
      email: userLoginDto.email,
    });
    if (!(await compare(userLoginDto.password, user.password)))
      throw new ForbiddenException('Invalid Credentials');
    return user;
  }

  async getUserProfileBy(filter: any) {
    const user = await this.userRepository.findOne({ where: filter });
    if (!user) throw new UnprocessableEntityException('User not found');
    return user;
  }
}
