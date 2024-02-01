import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('genre')
export class Genre extends AbstractEntity<Genre> {
  @Column()
  'tmdb_id': number;
  @Column()
  'name': string;
}
