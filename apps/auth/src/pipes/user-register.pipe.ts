import { BadRequestException, PipeTransform } from '@nestjs/common';

export class UserRegisterPipe implements PipeTransform {
  transform(value: any): any {
    if (value['password'] === value['confirmPassword']) return value;
    else
      throw new BadRequestException(
        'Password and Confirm Password is not the same',
      );
  }
}
