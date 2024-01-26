import { AbstractEntity, AbstractRepository } from '@app/common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('videos')
export class Video extends AbstractEntity<Video> {
  @Column()
  title: string;

  @Column()
  size: string;

  @Column()
  extension: string;

  @Column()
  path: string;
}
