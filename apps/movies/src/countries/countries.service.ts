import { Injectable } from '@nestjs/common';
import { ProductionCountryRepository } from './production-country.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductionCountry } from './production-country.entity';

@Injectable()
export class CountriesService {
  constructor(
    private readonly productionCountryRepository: ProductionCountryRepository,
    private readonly ee: EventEmitter2,
  ) {}

  async checkProductionCountry(movie: any) {
    const countries = movie.production_countries;
    return await Promise.all(
      countries.map(async (country: any) => {
        let isValidCountry = await this.productionCountryRepository.checkOne({
          iso_3166_1: country.iso_3166_1,
        });
        if (isValidCountry === null) {
          isValidCountry = new ProductionCountry();
          country.tmdb_id = country.id;
          delete country.id;
          Object.assign(isValidCountry, country);
          isValidCountry =
            await this.productionCountryRepository.create(isValidCountry);
        }
        return isValidCountry;
      }),
    );
  }
}
