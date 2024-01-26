import { Controller } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CHECK_SPOKEN_LANGUAGES } from '@app/common';

@Controller('languages')
export class LanguagesController {
  constructor(
    private readonly spokenLanguagesService: LanguagesService,
    private readonly ee: EventEmitter2,
  ) {
    this.handleEvents();
  }

  async checkSpokenLanguage(movie: any) {
    return await this.spokenLanguagesService.checkSpokenLanguages(movie);
  }

  async handleEvents() {
    this.ee.on(CHECK_SPOKEN_LANGUAGES, async (data) => {
      return await this.checkSpokenLanguage(data);
    });
  }
}
