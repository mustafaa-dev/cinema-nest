import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserRegistrationDto {
  @IsEmail()
  email: string;
  @IsStrongPassword()
  password: string;
  @IsString()
  name: string;
}
