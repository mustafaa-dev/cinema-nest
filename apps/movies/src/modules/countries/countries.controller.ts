import { Controller } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHECK_PRODUCTION_COUNTRIES } from '@app/common';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly productionCountriesService: CountriesService,
    private readonly ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  async checkProductionCountry(movie: any) {
    return await this.productionCountriesService.checkProductionCountry(movie);
  }

  async handleEvents() {
    this.ee.on(CHECK_PRODUCTION_COUNTRIES, async (data) => {
      return await this.checkProductionCountry(data);
    });
  }
}
