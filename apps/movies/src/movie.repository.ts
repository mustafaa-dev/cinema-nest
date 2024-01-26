import { AbstractRepository } from '@app/common';
import { Movie } from './movie.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class MovieRepository extends AbstractRepository<Movie> {
  constructor(
    @InjectRepository(Movie) movieRepository: Repository<Movie>,
    entityManager: EntityManager,
  ) {
    super(movieRepository, entityManager, 'Movie Not Found');
  }
}
