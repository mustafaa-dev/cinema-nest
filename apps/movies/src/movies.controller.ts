import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { JwtGuard } from 'apps/auth/src/guards/jwt.guard';
import { CurrentUser, EditMovieDto, Permissions } from '@app/common';
import { User } from 'apps/users/src/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { VerifiedGuard } from 'apps/auth/src/guards/verified.guard';
import { sendSuccess } from '@app/common/interfaces/response.interface';
import { PermissionGuard } from '../../auth/src/guards/permission.guard';
import { VideoInterceptor } from './modules/videos/Interceptors/video.interceptor';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('search')
  async searchForMovie(@Body() search: string) {
    return await this.moviesService.searchForMovie(search);
  }

  @Post('add/:id')
  @UseInterceptors(FileInterceptor('video'), VideoInterceptor)
  @UseGuards(JwtGuard, VerifiedGuard)
  async addMovie(
    @Param() id: number,
    @UploadedFile()
    video: Express.Multer.File,
    @CurrentUser() user: User,
  ) {
    return sendSuccess(await this.moviesService.addMovie(id, user, video));
  }

  @Get('/:id')
  // @Serialize(GetMovieResponseDto)
  @UseGuards(JwtGuard, PermissionGuard)
  @Permissions(['DELETE_ALL_MOVIES'])
  async getMovieDetails(@Param('id') id: number) {
    return await this.moviesService.getMovieById(id);
  }

  @Delete('/:id')
  // @Serialize(GetMovieResponseDto)
  @UseGuards(JwtGuard, VerifiedGuard)
  async deleteMovie(@Param('id') id: number) {
    return await this.moviesService.deleteMovieById(id);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(JwtGuard, VerifiedGuard)
  async editMovie(
    @Param('id') id: number,
    @Body() updateMovieDto: EditMovieDto,
    @UploadedFile() video: Express.Multer.File,
  ) {
    return await this.moviesService.updateMovieById(id, updateMovieDto, video);
  }
}
