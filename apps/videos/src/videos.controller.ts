import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('video'))
  async uploadFile(@UploadedFile() video: Express.Multer.File) {
    return await this.videosService.uploadVideo(video);
  }
}
