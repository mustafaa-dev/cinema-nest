import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsPhoneNumber('EG')
  phone: string;

  @IsInt()
  roleId: number;

  @IsBoolean()
  isSuperAdmin: boolean;
}
