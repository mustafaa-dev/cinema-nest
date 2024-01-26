import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { LoggerModule } from '@app/common';

@Module({
  imports: [LoggerModule],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
