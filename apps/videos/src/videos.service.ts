import { Injectable } from '@nestjs/common';
import { VideoRepository } from './video.repository';

@Injectable()
export class VideosService {
  constructor(private readonly videoRepository: VideoRepository) {}

  async uploadVideo(video: any) {
    // const newVideo = new Video();
    Object.assign(video.newVideo, video.video);
    return await this.videoRepository.create(video.newVideo);
  }
}
