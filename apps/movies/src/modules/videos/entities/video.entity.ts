import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('videos')
export class Video extends AbstractEntity<Video> {
  @Column()
  originalname: string;

  @Column()
  secure_url: string;

  @Column({ type: 'text' })
  delete_token: string;

  @Column()
  duration: number;
  @Column()
  frame_rate: number;

  @Column()
  format: string;

  @Column()
  bytes: string;
}
