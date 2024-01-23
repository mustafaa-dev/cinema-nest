import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  licenceCode: number;

  @IsNotEmpty()
  type: roles;
}

export enum roles {
  CLIENT = 1,
  EMPLOYEE = 2,
}
