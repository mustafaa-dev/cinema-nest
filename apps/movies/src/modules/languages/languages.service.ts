import { Injectable } from '@nestjs/common';
import { SpokenLanguagesRepository } from './spoken-languages.repository';
import { SpokenLanguage } from './spoken-language.entity';

@Injectable()
export class LanguagesService {
  constructor(
    private readonly spokenLanguagesRepository: SpokenLanguagesRepository,
  ) {}

  async checkSpokenLanguages(movie: any) {
    let status: any = null;
    const languages: SpokenLanguage[] = [];
    await Promise.all(
      movie.spoken_languages.map(async (language: any) => {
        let isValidLanguage = await this.spokenLanguagesRepository.checkOne({
          iso_639_1: language.iso_639_1,
        });
        if (isValidLanguage === null) {
          status = false;
          isValidLanguage = new SpokenLanguage();
          language.tmdb_id = language.id;
          delete language.id;
          Object.assign(isValidLanguage, language);
          isValidLanguage =
            await this.spokenLanguagesRepository.create(isValidLanguage);
        } else {
          status = true;
        }
        languages.push(isValidLanguage);
      }),
    );
    return { languages, status };
  }
}
