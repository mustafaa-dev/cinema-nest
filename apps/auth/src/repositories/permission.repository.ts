import { AbstractRepository } from '@app/common';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class PermissionRepository extends AbstractRepository<Permission> {
  constructor(
    @InjectRepository(Permission) permissionRepository: Repository<Permission>,
    entityManager: EntityManager,
  ) {
    super(permissionRepository, entityManager, 'Permission Not found');
  }
}
