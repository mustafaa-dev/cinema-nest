import { Expose } from 'class-transformer';

export class AdminResponseDto {
  @Expose()
  name: string;

  @Expose()
  userName: string;

  @Expose()
  phone: number;

  @Expose()
  picture: string;
}
