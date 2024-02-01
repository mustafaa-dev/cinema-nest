import { Movie } from '../../../../apps/movies/src/entities/movie.entity';

export class MovieMapper {
  constructor(private readonly movie: any) {
    this.movie = movie;
    this.mapData();
  }

  mapData() {
    this.movie.user = this.mapUser();
  }

  mapUser() {
    const user = this.movie.user;
    delete this.movie.user;
    return {
      id: user.id,
      name: user.name,
      picture: user.picture,
      movies: this.mapUserMovies(user.movies),
    };
  }

  mapUserMovies(movies: Movie[]) {
    const userMovies: any = [];
    movies.map((userMovie: Movie) => {
      userMovies.push({
        id: userMovie.id,
        title: userMovie.title,
        poster: userMovie.poster_path,
      });
    });
    return userMovies;
  }
}
