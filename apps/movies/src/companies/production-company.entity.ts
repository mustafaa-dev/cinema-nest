import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('production_company')
export class ProductionCompany extends AbstractEntity<ProductionCompany> {
  @Column()
  'tmdb_id': number;
  @Column({ nullable: true })
  'logo_path': string;
  @Column()
  'name': string;
  @Column()
  'origin_country': string;
}
