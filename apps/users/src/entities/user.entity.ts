import { BeforeInsert, Column, Entity } from 'typeorm';
import { hash } from 'bcryptjs';
import { AbstractEntity } from '@app/common';
import { addMinutes } from 'date-fns';

@Entity('users')
export class User extends AbstractEntity<User> {
  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  code: number;

  @Column({ nullable: true })
  codeExpiration: Date;

  //   @Column()
  //   role: string;

  @BeforeInsert()
  async saving() {
    this.password = await hash(this.password, 10);
    this.codeExpiration = addMinutes(new Date(), 10);
  }
}
