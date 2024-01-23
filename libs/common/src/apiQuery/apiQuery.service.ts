import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiQueryService {
  private repository: any;
  private table: string;
  private queryObject: any;
  private query: any;

  constructor() {}

  set(repository: any, table: string, queryObject: object): ApiQueryService {
    this.repository = repository;
    this.table = table;
    this.queryObject = queryObject;
    this.query = this.repository.createQueryBuilder(this.table);

    return this;
  }

  filter() {
    const queryData = { ...this.queryObject };
    const excludedData = ['page', 'limit', 'sort', 'fields'];
    excludedData.forEach((ele) => {
      delete queryData[ele];
    });

    for (const key in queryData) {
      if (queryData[key]) {
        this.query.andWhere(`${key} LIKE :${key}`, {
          [key]: `%${queryData[key]}%`,
        });
      }
    }

    return this;
  }

  select() {
    if (this.queryObject.fields) {
      const fields = this.queryObject.fields.split(',');
      this.query.select(
        fields.map((field: string) => `${this.table}.${field}`),
      );
    }

    return this;
  }

  sort() {
    const sorting = this.queryObject.sort || `${this.table}.createdAt:DESC`;
    const [field, order] = sorting.split(':');
    this.query.orderBy(field, order.toUpperCase() as 'ASC' | 'DESC');
    return this;
  }

  paginate() {
    if (this.queryObject.page) {
      const page = this.queryObject.page;
      const limit = this.queryObject.limit || 10;
      this.query.offset((page - 1) * limit).limit(limit);
    }
  }

  leftAndSelect(on: string, to: string) {
    this.query.leftJoinAndSelect(on, to);
    return this;
  }

  where(key: any, value: any) {
    this.query.andWhere(`${key} = ${value}`);
    return this;
  }

  async getResult(): Promise<{ data: []; count: number }> {
    this.filter().select().sort().paginate();
    const data = await this.query.getMany();
    const count = await this.query.getCount();
    return { data, count };
  }
}
