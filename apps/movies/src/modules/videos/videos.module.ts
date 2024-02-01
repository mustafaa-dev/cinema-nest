import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { DatabaseModule, LoggerModule } from '@app/common';
import { Video } from './entities/video.entity';
import { MulterModule } from '@nestjs/platform-express';
import { VideoRepository } from './repositories/video.repository';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([Video]),
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService, VideoRepository],
  exports: [VideosService],
})
export class VideosModule {}
