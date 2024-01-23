import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';

export const config: DataSourceOptions = {
  host: process.env.DB_HOST || 'localhost',
  type: 'mysql',
  username: process.env.DB_USER || 'root',
  password: `${process.env.DB_PASSWORD}` || 'toor',
  port: +process.env.DB_PORT || 3306,
  database: process.env.DB_DATABASE || 'cashcloud',
  entities: [path.join('dist', 'apps', '**', '*.entity.js')],
  migrations: [path.join('libs', '**', 'seeds', '*{.js,.ts}')],
};

const dataSource = new DataSource(config);
export default dataSource;
