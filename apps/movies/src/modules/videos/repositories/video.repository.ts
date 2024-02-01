import { AbstractRepository } from '@app/common';
import { Video } from '../entities/video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class VideoRepository extends AbstractRepository<Video> {
  constructor(
    @InjectRepository(Video) videoRepository: Repository<Video>,
    entityManager: EntityManager,
  ) {
    super(videoRepository, entityManager, 'Video Not Found');
  }
}
