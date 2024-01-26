import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';
import { SpokenLanguagesRepository } from './spoken-languages.repository';
import { SpokenLanguage } from './spoken-language.entity';
import { DatabaseModule } from '@app/common';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([SpokenLanguage])],
  controllers: [LanguagesController],
  providers: [LanguagesService, SpokenLanguagesRepository],
  exports: [SpokenLanguagesRepository],
})
export class LanguagesModule {}
