import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { Video } from './video.entity';
import { MulterModule } from '@nestjs/platform-express';
import { VideoRepository } from './video.repository';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([Video]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideoRepository],
})
export class VideosModule {}
