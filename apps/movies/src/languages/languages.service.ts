import { Injectable } from '@nestjs/common';
import { SpokenLanguagesRepository } from './spoken-languages.repository';
import { SpokenLanguage } from './spoken-language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly spokenLanguagesRepository: SpokenLanguagesRepository,
  ) {}

  async checkSpokenLanguages(movie: any) {
    const languages = movie.spoken_languages;
    return await Promise.all(
      languages.map(async (language: any) => {
        let isValidLanguage = await this.spokenLanguagesRepository.checkOne({
          iso_639_1: language.iso_639_1,
        });
        if (isValidLanguage === null) {
          isValidLanguage = new SpokenLanguage();
          language.tmdb_id = language.id;
          delete language.id;
          Object.assign(isValidLanguage, language);
          isValidLanguage =
            await this.spokenLanguagesRepository.create(isValidLanguage);
        }
        return isValidLanguage;
      }),
    );
  }
}
