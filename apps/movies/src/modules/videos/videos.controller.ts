import { Controller } from '@nestjs/common';
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

  async uploadVideo(data: object) {
    return await this.videosService.uploadVideo(data);
  }

  handleEvents() {
    this.ee.on(UPLOAD_VIDEO, async (data) => {
      return await this.uploadVideo(data);
    });
  }
}
