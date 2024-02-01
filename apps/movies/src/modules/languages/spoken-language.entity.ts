import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('spoken_languages')
export class SpokenLanguage extends AbstractEntity<SpokenLanguage> {
  @Column()
  'iso_639_1': string;
  @Column()
  'name': string;
  @Column()
  'english_name': string;
}
