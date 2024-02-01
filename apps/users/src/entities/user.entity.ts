import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { hash } from 'bcryptjs';
import { AbstractEntity } from '@app/common';
import { Movie } from '../../../movies/src/entities/movie.entity';
import { Role } from '../../../auth/src/entities/role.entity';

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
  @OneToOne(() => Role, { eager: true })
  @JoinColumn()
  role: Role;
  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];

  @BeforeInsert()
  async saving() {
    this.password = await hash(this.password, 10);
  }
}
