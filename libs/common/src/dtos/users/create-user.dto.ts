import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
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

  @IsOptional()
  noOfStores?: number;

  @IsInt()
  roleId: number;

  @IsOptional()
  licenseCode?: number;
}
