import { Expose } from 'class-transformer';

export class SuccessInterface {
  @Expose()
  status: any;
  @Expose()
  data: any;
  @Expose()
  statusCode: number;
  @Expose()
  message: string;
}
