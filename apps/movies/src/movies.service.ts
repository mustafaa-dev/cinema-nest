import { BadRequestException, Injectable } from '@nestjs/common';
import * as fetch from 'node-fetch';
import { Movie } from './entities/movie.entity';
import { MovieRepository } from './repositories/movie.repository';
import { EntityManager } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MovieMapper } from '@app/common';
import { User } from 'apps/users/src/entities/user.entity';
import { Video } from './modules/videos/entities/video.entity';
import {
  TMDB_API,
  TMDB_CONNECTION_OPTIONS,
} from './config/api-connection.config';
import { CollectionsService } from './modules/collections/collections.service';
import { GenresService } from './modules/genres/genres.service';
import { CompaniesService } from './modules/companies/companies.service';
import { CountriesService } from './modules/countries/countries.service';
import { LanguagesService } from './modules/languages/languages.service';
import { MoviesCollection } from './modules/collections/collections.entity';
import { Genre } from './modules/genres/genre.entity';
import {
  sendError,
  sendSuccess,
} from '@app/common/interfaces/response.interface';
import { ProductionCompany } from './modules/companies/production-company.entity';
import { ProductionCountry } from './modules/countries/production-country.entity';
import { SpokenLanguage } from './modules/languages/spoken-language.entity';
import { VideosService } from './modules/videos/videos.service';
import { LocalMovieMapper } from './mappers/movie.mapper';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly entityManager: EntityManager,
    private readonly movieCollectionService: CollectionsService,
    private readonly genresService: GenresService,
    private readonly productionCompanyService: CompaniesService,
    private readonly productionCountriesService: CountriesService,
    private readonly spokenLanguagesService: LanguagesService,
    private readonly videoService: VideosService,
    private readonly ee: EventEmitter2,
  ) {}

  async searchForMovie({ search, page }: any) {
    const url = `${TMDB_API}/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
    return LocalMovieMapper.sendMovieSearchResponse(await this.callApi(url));
  }

  async addMovie({ id }: any, user: User, video: Express.Multer.File) {
    const url = `${TMDB_API}/movie/${id}?language=en-US`;
    const movieData = await this.callApi(url);
    const movie = new LocalMovieMapper(movieData);

    return this.entityManager.transaction(async (transactionManager) => {
      const newMovie = new Movie();
      Object.assign(newMovie, movie);
      await this.checkMovie(movie);
      newMovie.belongs_to = await this.checkMovieCollection(
        movie,
        transactionManager,
      );
      newMovie.genres = await this.checkMovieGenres(movie, transactionManager);
      newMovie.production_companies = await this.checkProductionCompanies(
        movie,
        transactionManager,
      );
      newMovie.production_countries = await this.checkProductionCountry(
        movie,
        transactionManager,
      );
      newMovie.spoken_languages = await this.checkSpokenLanguages(
        movie,
        transactionManager,
      );
      newMovie.user = user;
      if (video) newMovie.video = await this.addVideo(video);
      await transactionManager.save(Movie, newMovie);
      return sendSuccess(newMovie);
    });
  }

  async callApi(url: string) {
    try {
      const movies = await fetch(url, TMDB_CONNECTION_OPTIONS);
      return await movies.json();
    } catch (error) {
      throw error;
    }
  }

  async checkMovie(movie: any) {
    const checkMovie = await this.movieRepository.checkOne({
      tmdb_id: movie.tmdb_id,
    });
    if (checkMovie !== null) throw new BadRequestException('already added');
  }

  async checkMovieCollection(movie: any, transactionManager: EntityManager) {
    const { data, status } =
      await this.movieCollectionService.checkMovieCollection(movie);
    if (status) {
      return data;
    } else if (status === false) {
      return await transactionManager.save(MoviesCollection, data);
    }
  }

  async checkMovieGenres(movie: any, transactionManager: EntityManager) {
    const { genres, status } = await this.genresService.checkGenres(movie);
    let data: Genre[] = [];
    if (status) {
      data = genres;
    } else if (status === false) {
      data = await transactionManager.save(Genre, genres);
    }
    return data;
  }

  async checkProductionCompanies(
    movie: any,
    transactionManager: EntityManager,
  ) {
    const { companies, status } =
      await this.productionCompanyService.checkProductionCompanies(movie);
    let data: ProductionCompany[] = [];
    if (status) {
      data = companies;
    } else if (status === false) {
      data = await transactionManager.save(ProductionCompany, companies);
    }
    return data;
  }

  async checkProductionCountry(movie: any, transactionManager: EntityManager) {
    const { countries, status } =
      await this.productionCountriesService.checkProductionCountry(movie);
    let data: ProductionCountry[] = [];
    if (status) {
      data = countries;
    } else if (status === false) {
      data = await transactionManager.save(ProductionCountry, countries);
    }
    return data;
  }

  async checkSpokenLanguages(movie: any, transactionManager: EntityManager) {
    const { languages, status } =
      await this.spokenLanguagesService.checkSpokenLanguages(movie);
    let data: SpokenLanguage[] = [];
    if (status) {
      data = languages;
    } else if (status === false) {
      data = await transactionManager.save(ProductionCountry, languages);
    }
    return data;
  }

  async addVideo(video: Express.Multer.File) {
    const newVideo = new Video();
    return await this.videoService.uploadVideo({ video, newVideo });
    // const x = await this.ee.emitAsync(UPLOAD_VIDEO, { video, newVideo });
    // console.log(x);
    // newVideo;
  }

  async getMovieById(id: number) {
    const movie = await this.entityManager
      .createQueryBuilder(Movie, 'movies')
      .where('movies.id = :id', { id })
      .leftJoinAndSelect('movies.user', 'user')
      .leftJoinAndSelect('user.movies', 'movie')
      .andWhere('movie.id != :id', { id })
      .getOne();
    if (!movie) return sendError('Movie Not found', 404);
    return new MovieMapper(movie);
  }

  async deleteMovieById(id: number) {
    if ((await this.movieRepository.findOneAndDelete({ id })).affected !== 0) {
      return sendSuccess('Deleted Successfully');
    } else return sendError('Not Found', 404);
  }

  async updateMovieById(id: number, update: any, video: Express.Multer.File) {
    const movie = await this.movieRepository.findOne({
      where: { id },
    });
    if (video) {
      if (!movie.video) {
        // movie.video = this.addVideo(video);
      } else {
        movie.video = await this.videoService.editVideo(+movie.video.id, video);
      }
    }

    Object.assign(movie, update);
    return await this.movieRepository.create(movie);
  }
}
