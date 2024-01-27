import { AbstractEntity, AbstractRepository } from '@app/common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('videos')
export class Video extends AbstractEntity<Video> {
  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  size: string;

  @Column()
  mimetype: string;

  @Column()
  path: string;
}
