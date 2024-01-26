import { AbstractEntity } from '@app/common';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { MoviesCollection } from './collections/collections.entity';
import { Genre } from './genres/genre.entity';
import { ProductionCompany } from './companies/production-company.entity';
import { ProductionCountry } from './countries/production-country.entity';
import { SpokenLanguage } from './languages/spoken-language.entity';

@Entity('movies')
export class Movie extends AbstractEntity<Movie> {
  @Column()
  adult: boolean;

  @Column()
  budget: number;

  @Column()
  'tmdb_id': number;

  @Column()
  imdb_id: string;
  @Column()
  original_language: string;

  @Column()
  original_title: string;
  @Column({ type: 'text' })
  overview: string;
  @Column()
  popularity: string;
  @Column()
  poster_path: string;
  @Column()
  release_date: Date;
  @Column()
  revenue: number;
  @Column()
  status: string;
  @Column()
  tagline: string;
  @Column()
  title: string;
  @Column()
  vote_average: number;
  @Column()
  vote_count: number;

  @ManyToOne(() => MoviesCollection, (collection) => collection.movies, {
    nullable: true,
  })
  belongs_to: MoviesCollection | null;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => ProductionCompany)
  @JoinTable()
  production_companies: ProductionCompany[];

  @ManyToMany(() => ProductionCountry)
  @JoinTable()
  production_countries: ProductionCountry[];

  @ManyToMany(() => SpokenLanguage)
  @JoinTable()
  spoken_languages: SpokenLanguage[];
}
