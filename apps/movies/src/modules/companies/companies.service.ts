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
    const companies: ProductionCompany[] = [];
    let status: any = null;
    await Promise.all(
      movie.production_companies.map(async (company: any) => {
        let isValidCompany = await this.productionCompaniesRepository.checkOne({
          tmdb_id: company.id,
        });
        status = true;
        if (isValidCompany === null) {
          status = false;
          isValidCompany = new ProductionCompany();
          company.tmdb_id = company.id;
          delete company.id;
          Object.assign(isValidCompany, company);
          // isValidCompany =
          //   await this.productionCompaniesRepository.create(isValidCompany);
        }
        companies.push(isValidCompany);
      }),
    );
    return { companies, status };
  }
}
