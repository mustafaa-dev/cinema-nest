import { Expose } from 'class-transformer';

export class GetMovieResponseDto {
  @Expose()
  id: number;
  @Expose()
  createdAt: Date;
  @Expose()
  adult: boolean;
  @Expose()
  budget: 85000000;
  @Expose()
  tmdb_id: number;
  @Expose()
  imdb_id: string;
  @Expose()
  original_language: string;
  @Expose()
  original_title: string;
  @Expose()
  overview: string;
}
