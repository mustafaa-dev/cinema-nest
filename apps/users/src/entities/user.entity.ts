import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcryptjs';
import { AbstractEntity } from '@app/common';

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  //   @Column()
  //   role: string;

  @BeforeInsert()
  async hashPass() {
    this.password = await hash(this.password, 10);
  }
}
