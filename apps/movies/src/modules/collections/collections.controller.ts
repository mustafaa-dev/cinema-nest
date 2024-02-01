import { Controller } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHECK_COLLECTION } from '@app/common';

@Controller('collections')
export class CollectionsController {
  constructor(
    private readonly movieCollectionService: CollectionsService,
    private readonly ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  async checkMovieCollection(movie: any) {
    return await this.movieCollectionService.checkMovieCollection(movie);
  }

  async handleEvents() {
    this.ee.on(CHECK_COLLECTION, async (data) => {
      return await this.checkMovieCollection(data);
    });
  }
}
