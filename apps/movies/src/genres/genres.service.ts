import { Injectable } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async checkGenres(movie: any) {
    const genres = movie.genres;
    return await Promise.all(
      genres.map(async (genre: any) => {
        let isValidGenre = await this.genresRepository.checkOne({
          tmdb_id: genre.id,
        });
        if (isValidGenre === null) {
          isValidGenre = new Genre();
          genre.tmdb_id = genre.id;
          delete genre.id;
          Object.assign(isValidGenre, genre);
          isValidGenre = await this.genresRepository.create(isValidGenre);
        }
        return isValidGenre;
      }),
    );
  }
}
