import { Injectable } from '@nestjs/common';
import { ProductionCompany } from './production-company.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductionCompanyRepository } from './production-company.repository';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly productionCompaniesRepository: ProductionCompanyRepository,
    private readonly ee: EventEmitter2,
  ) {}

  async checkProductionCompanies(movie: any) {
    const companies = movie.production_companies;
    return await Promise.all(
      companies.map(async (company: any) => {
        let isValidCompany = await this.productionCompaniesRepository.checkOne({
          tmdb_id: company.id,
        });
        if (isValidCompany === null) {
          isValidCompany = new ProductionCompany();
          company.tmdb_id = company.id;
          delete company.id;
          Object.assign(isValidCompany, company);
          isValidCompany =
            await this.productionCompaniesRepository.create(isValidCompany);
        }
        console.log(isValidCompany);
        return isValidCompany;
      }),
    );
  }
}
