import { AbstractRepository } from '@app/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionCountry } from './production-country.entity';

export class ProductionCountryRepository extends AbstractRepository<ProductionCountry> {
  constructor(
    @InjectRepository(ProductionCountry)
    productionCountryRepository: Repository<ProductionCountry>,
    entityManager: EntityManager,
  ) {
    super(
      productionCountryRepository,
      entityManager,
      'Production Country not Found',
    );
  }
}
