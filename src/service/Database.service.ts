import { DataBase } from 'src/pojo/database.';
import { Res } from 'src/response/R';
import { QueryRunner, TableOptions } from 'typeorm';

export interface UpdateData {
  [key: string]: any;
}

export interface WhereCondition {
  [key: string]: any;
}

export interface DatabaseService {
  createTable: (data: TableOptions, queryRunner: QueryRunner) => Promise<void>;
  dropTable: (tableName: string, queryRunner: QueryRunner) => Promise<void>;
  add: (tableName: string, data: any) => Promise<Res>;
  findById: (tableName: string, id: string) => Promise<DataBase[]>;
  update: (
    tableName: string,
    updateData: UpdateData,
    where: WhereCondition,
  ) => Promise<Res>;
}
