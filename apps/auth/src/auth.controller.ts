import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CurrentUser,
  UserRegistrationDto,
  UserVerificationDto,
} from '@app/common';
import { LocalAuthGuard } from './guards/local.guard';
import { User } from '../../users/src/entities/user.entity';
import { JwtGuard } from './guards/jwt.guard';
import { UserRegisterPipe } from './pipes/user-register.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new UserRegisterPipe())
  async register(@Body() userRegistrationDto: UserRegistrationDto) {
    return await this.authService.register(userRegistrationDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User) {
    return await this.authService.login(user);
  }

  @Put('verify')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtGuard)
  async verifyAccount(
    @Body() userVerificationDto: UserVerificationDto,
    @CurrentUser() user: User,
  ) {
    return await this.authService.verify(userVerificationDto, user);
  }
}
