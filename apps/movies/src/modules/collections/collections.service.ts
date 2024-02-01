import { Injectable } from '@nestjs/common';
import { MovieCollectionRepository } from './collections.repository';
import { MoviesCollection } from './collections.entity';
import { MainChecker } from '@app/common';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly movieCollectionRepository: MovieCollectionRepository,
  ) {}

  async checkMovieCollection({ movie }: any) {
    // let movieCollection: any = null;
    // let status: any = null;
    // if (movie.belongs_to !== null) {
    //   movieCollection = await this.movieCollectionRepository.checkOne({
    //     tmdb_id: movie.belongs_to.id,
    //   });
    //   if (!movieCollection) {
    //     movieCollection = new MoviesCollection();
    //     status = false;
    //     movie.belongs_to.tmdb_id = movie.belongs_to.id;
    //     delete movie.belongs_to.id;
    //     Object.assign(movieCollection, movie.belongs_to);
    //   } else {
    //     status = true;
    //   }
    // }
    // return { movieCollection, status };
    const checker = new MainChecker(
      movie,
      movie.belongs_to,
      this.movieCollectionRepository,
      {
        tmdb_id: movie.belongs_to.id,
      },
      MoviesCollection,
      movie.belongs_to.id,
      movie.belongs_to.tmdb_id,
    );
    return await checker.check();
  }

  async addMovieCollection(collection: MoviesCollection) {
    return await this.movieCollectionRepository.create(collection);
  }
}
