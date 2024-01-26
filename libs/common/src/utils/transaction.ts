import { DataSource } from 'typeorm';

export function transact(queryRunner: any, transaction: any) {
  try {
    transaction();
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

export function startTrans(dataSource: DataSource) {
  const queryRunner = this.dataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  return queryRunner;
}
