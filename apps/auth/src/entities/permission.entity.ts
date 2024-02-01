import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common';

@Entity()
export class Permission extends AbstractEntity<Permission> {
  @Column()
  name: string;
}
