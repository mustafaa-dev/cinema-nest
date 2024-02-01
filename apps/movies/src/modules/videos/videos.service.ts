import { Injectable } from '@nestjs/common';
import { VideoRepository } from './repositories/video.repository';
import { v2 as cloudinary } from 'cloudinary';
import * as process from 'process';
import * as stream from 'stream';
import { UploadOptionsConfig } from './config/upload-options.config';

@Injectable()
export class VideosService {
  constructor(private readonly videoRepository: VideoRepository) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadVideo({ newVideo, video }: any) {
    const uploaded = await this.uploadStream(video.buffer);
    const videoData = {
      originalname: video.originalname,
      secure_url: uploaded.secure_url,
      delete_token: uploaded.delete_token,
      duration: uploaded.duration,
      frame_rate: uploaded.frame_rate,
      format: uploaded.format,
      bytes: uploaded.bytes,
    };
    Object.assign(newVideo, videoData);
    return await this.videoRepository.create(newVideo);
  }

  async editVideo(id: number, video: any) {
    delete video.fieldname;
    delete video.encoding;
    delete video.destination;
    // Object.assign(video.newVideo, video.video);
    return await this.videoRepository.findOneAndUpdate({ id }, video);
  }

  async uploadStream(videoBuffer: Buffer): Promise<any> {
    return new Promise((res, rej) => {
      const theTransformStream = cloudinary.uploader.upload_stream(
        UploadOptionsConfig,
        (err: any, result: any) => {
          if (err) return rej(err);
          res(result);
        },
      );
      const videoStream = stream.Readable.from(videoBuffer);
      videoStream.pipe(theTransformStream);
    });
  }
}
