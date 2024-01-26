import { Controller } from '@nestjs/common';
import { GenresService } from './genres.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHECK_GENRES } from '@app/common';

@Controller('genres')
export class GenresController {
  constructor(
    private readonly genresService: GenresService,
    private readonly ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  async checkGenres(movie: any) {
    return await this.genresService.checkGenres(movie);
  }

  async handleEvents() {
    this.ee.on(CHECK_GENRES, async (data) => {
      return await this.checkGenres(data);
    });
  }
}
