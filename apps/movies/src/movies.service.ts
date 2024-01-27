import { BadRequestException, Injectable } from '@nestjs/common';
import * as fetch from 'node-fetch';
import { Movie } from './movie.entity';
import { MovieRepository } from './movie.repository';
import { DataSource } from 'typeorm';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  CHECK_COLLECTION,
  CHECK_GENRES,
  CHECK_PRODUCTION_COMPANIES,
  CHECK_PRODUCTION_COUNTRIES,
  CHECK_SPOKEN_LANGUAGES,
  UPLOAD_VIDEO,
} from '@app/common';
import { User } from 'apps/users/src/entities/user.entity';
import { Video } from 'apps/videos/src/video.entity';

@Injectable()
export class MoviesService {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly ee: EventEmitter2,
    private dataSource: DataSource,
  ) {}

  async searchForMovie({ search, page }: any) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`;
    let movies = await this.callApi(url);
    movies = movies.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
    }));

    return movies;
  }

  async addMovie({ id }: any, user: User) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    const movie = this.filterMovieData(await this.callApi(url));
    const newMovie = new Movie();
    Object.assign(newMovie, movie);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      newMovie.belongs_to = await this.checkMovieCollection(movie);
      newMovie.genres = await this.checkMovieGenres(movie);
      newMovie.production_companies =
        await this.checkProductionCompanies(movie);
      newMovie.production_countries = await this.checkProductionCountry(movie);
      newMovie.spoken_languages = await this.checkSpokenLanguages(movie);
      newMovie.user = user;
      newMovie.video = this.addVideo();
      await this.checkMovie(movie);
      return await this.movieRepository.create(newMovie);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async callApi(url: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YWE1Zjk0YmYzZmY2NzAwMDVhYTYwOWI1NzA0ZTM2ZiIsInN1YiI6IjVjZTg4MWU3OTI1MTQxNTQ1MGJjMGZkNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3ST2dlJIHKX4B3-6HTLbP7oNISQ_SmvaXEBjUHNAtyo',
      },
    };
    const movies = await fetch(url, options);
    return await movies.json();
  }

  filterMovieData(movie: any) {
    const unWanted = [
      'backdrop_path',
      'homepage',
      'runtime',
      'video',
      'belongs_to_collection',
      'id',
    ];
    const reMap = [
      { key: 'id', value: 'tmdb_id' },
      { key: 'belongs_to_collection', value: 'belongs_to' },
    ];
    for (const { key, value } of reMap) {
      movie[value] = movie[key];
    }
    unWanted.map((key) => {
      delete movie[key];
    });
    return movie;
  }

  async checkMovie(movie: any) {
    const checkMovie = await this.movieRepository.checkOne({
      tmdb_id: movie.tmdb_id,
    });
    if (checkMovie !== null) throw new BadRequestException('Already Added');
    return;
  }

  async checkMovieCollection(movie: any) {
    return (await this.ee.emitAsync(CHECK_COLLECTION, movie)).at(0);
  }

  async checkMovieGenres(movie: any) {
    return (await this.ee.emitAsync(CHECK_GENRES, movie)).at(0);
  }

  async checkProductionCompanies(movie: any) {
    return (await this.ee.emitAsync(CHECK_PRODUCTION_COMPANIES, movie)).at(0);
  }

  async checkProductionCountry(movie: any) {
    return (await this.ee.emitAsync(CHECK_PRODUCTION_COUNTRIES, movie)).at(0);
  }
  async checkSpokenLanguages(movie: any) {
    return (await this.ee.emitAsync(CHECK_SPOKEN_LANGUAGES, movie)).at(0);
  }

  addVideo() {
    const newVideo = new Video();
    this.ee.emit(UPLOAD_VIDEO, newVideo);
    return newVideo;
  }
}
