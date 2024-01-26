import { AbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { Movie } from '../movie.entity';

@Entity('movies_collections')
export class MoviesCollection extends AbstractEntity<MoviesCollection> {
  @Column()
  'tmdb_id': number;
  @Column()
  'name': string;
  @Column()
  'poster_path': string;

  @OneToMany(() => Movie, (movie) => movie.belongs_to)
  movies: Movie[];
}
