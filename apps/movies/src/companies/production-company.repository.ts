import { AbstractRepository } from '@app/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductionCompany } from './production-company.entity';

export class ProductionCompanyRepository extends AbstractRepository<ProductionCompany> {
  constructor(
    @InjectRepository(ProductionCompany)
    private readonly productionCompanyRepository: Repository<ProductionCompany>,
    entityManager: EntityManager,
  ) {
    super(productionCompanyRepository, entityManager);
  }
}
