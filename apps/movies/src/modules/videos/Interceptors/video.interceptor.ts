import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  VIDEO_MIME_TYPES,
  VIDEO_SIZE,
} from '@app/common/constants/video-options';

export class VideoInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const video = context.switchToHttp().getRequest().file;
    if (video) {
      if (!VIDEO_MIME_TYPES.includes(video.mimetype))
        throw new BadRequestException(
          `Expected Video Format But Got ${video.mimetype.split('/')[1]} file`,
        );
      if (video.size > VIDEO_SIZE)
        throw new BadRequestException("Video size can't Exceed 1GB");
    }
    return next.handle();
  }
}
