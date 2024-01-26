import { Expose } from 'class-transformer';

export class ProfileDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  verified: boolean;
}
