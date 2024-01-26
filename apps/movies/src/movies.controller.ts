import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtGuard } from 'apps/auth/src/guards/jwt.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchForMovie(@Body() search: string) {
    return await this.moviesService.searchForMovie(search);
  }

  @Post('add')
  @UseGuards(JwtGuard)
  async addMovie(@Body() id: number) {
    return await this.moviesService.addMovie(id);
  }
}
