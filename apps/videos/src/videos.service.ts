import { Injectable } from '@nestjs/common';
import { VideoRepository } from './video.repository';
import { Video } from './video.entity';

@Injectable()
export class VideosService {
  constructor(private readonly videoRepository: VideoRepository) {}

  async uploadVideo(video: any) {
    const newVideo = new Video();
    Object.assign(newVideo, video);
    return await this.videoRepository.create(newVideo);
  }
}
