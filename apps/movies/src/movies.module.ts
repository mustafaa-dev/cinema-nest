import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { DatabaseModule } from '@app/common';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';

import { CollectionsModule } from './modules/collections/collections.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CountriesModule } from './modules/countries/countries.module';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { VideosModule } from './modules/videos/videos.module';
import { GenresModule } from './modules/genres/genres.module';
import { LanguagesModule } from './modules/languages/languages.module';
import { memoryStorage } from 'multer';

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
    VideosModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MovieRepository],
})
export class MoviesModule {}
