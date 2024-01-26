import { AbstractEntity } from '@app/common';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<
  TEntity extends AbstractEntity<TEntity>,
> {
  protected constructor(
    private readonly entityRepository: Repository<TEntity>,
    private readonly entityManager: EntityManager,
    private notFoundMsg: string,
  ) {}

  async create(entity: TEntity): Promise<TEntity> {
    return await this.entityManager.save(entity);
  }

  async findOne(where: object): Promise<TEntity> {
    const entity = await this.entityRepository.findOne({ where });
    if (!entity) throw new NotFoundException(this.notFoundMsg);
    return entity;
  }

  async findOneAndUpdate(
    where: FindOptionsWhere<TEntity>,
    update: QueryDeepPartialEntity<TEntity>,
  ) {
    const entity = await this.entityRepository.update(where, update);
    if (!entity.affected) throw new NotFoundException(this.notFoundMsg);
    return this.findOne(where);
  }

  async find(where: FindOptionsWhere<TEntity>) {
    return await this.entityRepository.find({ where });
  }

  async findOneAndDelete(where: FindOptionsWhere<TEntity>) {
    return await this.entityRepository.delete(where);
  }

  async checkOne(where: FindOptionsWhere<TEntity>) {
    return await this.entityRepository.findOneBy(where);
  }
}
