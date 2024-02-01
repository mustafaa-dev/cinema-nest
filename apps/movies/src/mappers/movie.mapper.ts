import { Movie } from '../entities/movie.entity';

export class LocalMovieMapper {
  constructor(private movie: Movie) {
    this.filter();
  }

  static sendMovieSearchResponse(movies) {
    return movies.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
    }));
  }

  filter() {
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
      this.movie[value] = this.movie[key];
    }
    unWanted.map((key) => {
      delete this.movie[key];
    });
  }
}
