import { AbstractEntity } from '@app/common';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { MoviesCollection } from '../modules/collections/collections.entity';
import { Genre } from '../modules/genres/genre.entity';
import { ProductionCompany } from '../modules/companies/production-company.entity';
import { ProductionCountry } from '../modules/countries/production-country.entity';
import { SpokenLanguage } from '../modules/languages/spoken-language.entity';
import { User } from '../../../users/src/entities/user.entity';
import { Video } from '../modules/videos/entities/video.entity';

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
    eager: true,
  })
  belongs_to: MoviesCollection | null;

  @ManyToMany(() => Genre, { nullable: true, eager: true })
  @JoinTable()
  genres: Genre[];

  @ManyToMany(() => ProductionCompany, { nullable: true, eager: true })
  @JoinTable()
  production_companies: ProductionCompany[];

  @ManyToMany(() => ProductionCountry, { nullable: true, eager: true })
  @JoinTable()
  production_countries: ProductionCountry[];

  @ManyToMany(() => SpokenLanguage, {
    eager: true,
    nullable: true,
  })
  @JoinTable()
  spoken_languages: SpokenLanguage[];

  @ManyToOne(() => User, (user) => user.movies, {
    eager: true,
    nullable: true,
  })
  user: User;

  @OneToOne(() => Video, { eager: true })
  @JoinColumn()
  video: Video;
}
