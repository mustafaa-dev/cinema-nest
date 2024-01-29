import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtGuard } from 'apps/auth/src/guards/jwt.guard';
import { CurrentUser } from '@app/common';
import { User } from 'apps/users/src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { VerifiedGuard } from 'apps/auth/src/guards/verified.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchForMovie(@Body() search: string) {
    return await this.moviesService.searchForMovie(search);
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtGuard, VerifiedGuard)
  async addMovie(
    @Body() id: number,
    @UploadedFile() video: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return await this.moviesService.addMovie(id, user, video);
  }
}
