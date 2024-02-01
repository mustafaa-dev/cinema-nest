import { Injectable } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { Genre } from './genre.entity';

@Injectable()
export class GenresService {
  constructor(private readonly genresRepository: GenresRepository) {}

  async checkGenres(movie: any) {
    const genres: Genre[] = [];
    let status: any = null;
    await Promise.all(
      movie.genres.map(async (genre: any) => {
        let isValidGenre = await this.genresRepository.checkOne({
          tmdb_id: genre.id,
        });
        if (isValidGenre === null) {
          status = false;
          isValidGenre = new Genre();
          genre.tmdb_id = genre.id;
          delete genre.id;
          Object.assign(isValidGenre, genre);
          // isValidGenre = await this.genresRepository.create(isValidGenre);
        } else {
          status = true;
        }
        genres.push(isValidGenre);
      }),
    );
    return { genres, status };
  }
}
