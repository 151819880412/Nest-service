import { DataBase } from 'src/pojo/database.';
import { DatabaseDto } from 'src/pojo/dto/database.dto';
import { Res } from 'src/response/R';
import { QueryRunner } from 'typeorm';

export interface UpdateData {
  [key: string]: any;
}

export interface WhereCondition {
  [key: string]: any;
}

export interface DatabaseService {
  createTable: (data: DatabaseDto, queryRunner: QueryRunner) => Promise<void>;
  dropTable: (tableName: string, queryRunner: QueryRunner) => Promise<void>;
  add: (tableName: string, data: any) => Promise<Res>;
  findById: (tableName: string, id: string) => Promise<DataBase[]>;
  update: (
    tableName: string,
    updateData: UpdateData,
    where: WhereCondition,
  ) => Promise<Res>;
}
