import { Expose, Type } from 'class-transformer';
import { Role } from '../../../../../../apps/auth/src/entities/role.entity';
import { ValidateNested } from 'class-validator';

export class ProfileDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  verified: boolean;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => Role)
  role: Role;
}
