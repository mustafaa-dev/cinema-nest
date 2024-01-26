import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { ProductionCountryRepository } from './production-country.repository';
import { ProductionCountry } from './production-country.entity';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([ProductionCountry])],
  providers: [CountriesService, ProductionCountryRepository],
  controllers: [CountriesController],
  exports: [ProductionCountryRepository],
})
export class CountriesModule {}
