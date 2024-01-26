import { AbstractRepository } from '@app/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from './genre.entity';

export class GenresRepository extends AbstractRepository<Genre> {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
    entityManager: EntityManager,
  ) {
    super(genresRepository, entityManager);
  }
}
