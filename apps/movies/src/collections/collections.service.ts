import { Injectable } from '@nestjs/common';
import { MovieCollectionRepository } from './collections.repository';
import { MoviesCollection } from './collections.entity';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly movieCollectionRepository: MovieCollectionRepository,
  ) {}

  async checkMovieCollection(movie: any) {
    let movieCollection: any = null;
    if (movie.belongs_to !== null) {
      movieCollection = await this.movieCollectionRepository.checkOne({
        tmdb_id: movie.belongs_to.id,
      });
      if (!movieCollection) {
        movieCollection = new MoviesCollection();
        movie.belongs_to.tmdb_id = movie.belongs_to.id;
        delete movie.belongs_to.id;
        Object.assign(movieCollection, movie.belongs_to);
        await this.movieCollectionRepository.create(movieCollection);
      }
      return movieCollection;
    }
  }
}
