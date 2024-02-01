import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';

export class EditMovieDto {
  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  adult: boolean;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  budget: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  original_language: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  original_title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  overview: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  popularity: string;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  release_date: Date;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  revenue: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  vote_average: number;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  vote_count: number;
}
