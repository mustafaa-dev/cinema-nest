import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { MovieCollectionRepository } from './collections.repository';
import { MoviesCollection } from './collections.entity';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([MoviesCollection])],
  controllers: [CollectionsController],
  providers: [CollectionsService, MovieCollectionRepository],
  exports: [MovieCollectionRepository],
})
export class CollectionsModule {}
