import { AbstractRepository } from '@app/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesCollection } from './collections.entity';

export class MovieCollectionRepository extends AbstractRepository<MoviesCollection> {
  constructor(
    @InjectRepository(MoviesCollection)
    private readonly movieCollectionRepository: Repository<MoviesCollection>,
    entityManager: EntityManager,
  ) {
    super(
      movieCollectionRepository,
      entityManager,
      'Movie Collection Not found',
    );
  }
}
