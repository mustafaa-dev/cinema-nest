import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DatabaseModule } from '@app/common';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { GenresModule } from './genres/genres.module';
import { CollectionsModule } from './collections/collections.module';
import { CompaniesModule } from './companies/companies.module';
import { CountriesModule } from './countries/countries.module';
import { LanguagesModule } from './languages/languages.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([Movie]),
    GenresModule,
    CollectionsModule,
    CompaniesModule,
    CountriesModule,
    LanguagesModule,
    EventEmitter2,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
})
export class MoviesModule {}
