import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('production_country')
export class ProductionCountry extends AbstractEntity<ProductionCountry> {
  @Column()
  'iso_3166_1': string;
  @Column()
  'name': string;
}
