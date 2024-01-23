import { Module } from '@nestjs/common';
import { ApiQueryService } from '@app/common/apiQuery/apiQuery.service';

@Module({ providers: [ApiQueryService], exports: [ApiQueryService] })
export class ApiQueryModule {}
