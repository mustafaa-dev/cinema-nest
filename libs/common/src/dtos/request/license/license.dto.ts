import { Expose } from 'class-transformer';

export class LicenseDto {
  @Expose()
  code: number;
  @Expose()
  active: boolean;
  @Expose()
  expiration: Date;
}
