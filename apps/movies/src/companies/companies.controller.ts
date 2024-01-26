import { Controller } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHECK_PRODUCTION_COMPANIES } from '@app/common';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly productionCompaniesService: CompaniesService,
    private readonly ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  async checkProductionCompanies(movie: any) {
    return await this.productionCompaniesService.checkProductionCompanies(
      movie,
    );
  }

  async handleEvents() {
    this.ee.on(CHECK_PRODUCTION_COMPANIES, async (data) => {
      return await this.checkProductionCompanies(data);
    });
  }
}
