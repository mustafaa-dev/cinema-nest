import { IsNumber } from 'class-validator';

export class UserVerificationDto {
  @IsNumber()
  code: number;
}
