import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { LicenseDto, RoleDto } from '@app/common';

export class UserLoginResponseDto {
  @Expose()
  name: string;

  @Expose()
  userName: string;

  @Expose()
  phone: number;

  @Expose()
  picture: string;

  @Expose()
  active: boolean;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => RoleDto)
  @IsOptional()
  role: RoleDto;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => LicenseDto)
  license: LicenseDto;
}
