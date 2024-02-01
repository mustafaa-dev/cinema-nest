import { AbstractRepository } from '@app/common';
import { Role } from '../entities/role.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

export class RoleRepository extends AbstractRepository<Role> {
  constructor(
    @InjectRepository(Role) roleRepository: Repository<Role>,
    entityManager: EntityManager,
  ) {
    super(roleRepository, entityManager, 'Role Not Found');
  }
}
