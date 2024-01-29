import { Controller, Post, UploadedFile } from '@nestjs/common';
import { VideosService } from './videos.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UPLOAD_VIDEO } from '@app/common';

@Controller('videos')
export class VideosController {
  constructor(
    private readonly videosService: VideosService,
    private readonly ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  @Post('upload')
  async uploadFile(@UploadedFile() video: Express.Multer.File) {
    return await this.videosService.uploadVideo(video);
  }

  uploadVideo(data: object) {
    this.videosService.uploadVideo(data);
  }

  async handleEvents() {
    this.ee.on(UPLOAD_VIDEO, async (data) => {
      this.uploadVideo(data);
    });
  }
}
