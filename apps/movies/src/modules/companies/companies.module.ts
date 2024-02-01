import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { ProductionCompanyRepository } from './production-company.repository';
import { DatabaseModule } from '@app/common';
import { ProductionCompany } from './production-company.entity';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([ProductionCompany])],
  controllers: [CompaniesController],
  providers: [CompaniesService, ProductionCompanyRepository],
  exports: [CompaniesService, ProductionCompanyRepository],
})
export class CompaniesModule {}
