import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { GenresRepository } from './genres.repository';
import { DatabaseModule } from '@app/common';
import { Genre } from './genre.entity';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenresService, GenresRepository],
  exports: [GenresService, GenresRepository],
})
export class GenresModule {}
