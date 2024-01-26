import { AbstractRepository } from '@app/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpokenLanguage } from './spoken-language.entity';

export class SpokenLanguagesRepository extends AbstractRepository<SpokenLanguage> {
  constructor(
    @InjectRepository(SpokenLanguage)
    private readonly spokenLanguagesRepository: Repository<SpokenLanguage>,
    entityManager: EntityManager,
  ) {
    super(spokenLanguagesRepository, entityManager);
  }
}
