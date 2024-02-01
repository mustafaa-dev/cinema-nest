import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { AbstractEntity } from '@app/common';
import { Permission } from './permission.entity';

@Entity()
export class Role extends AbstractEntity<Role> {
  @Column()
  name: string;

  @ManyToMany(() => Permission, { eager: true, nullable: true })
  @JoinTable()
  has: Permission[];
}
