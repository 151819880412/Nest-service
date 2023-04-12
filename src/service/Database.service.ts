import { DataBase } from 'src/pojo/database.';
import { Res } from 'src/response/R';
import { QueryRunner } from 'typeorm';

export interface UpdateData {
  [key: string]: any;
}

export interface WhereCondition {
  [key: string]: any;
}

export interface DatabaseService {
  up: (queryRunner: QueryRunner) => Promise<void>;
  down: (queryRunner: QueryRunner) => Promise<void>;
  add: (data: any) => Promise<Res>;
  findById: (id: string) => Promise<DataBase[]>;
  update: (updateData: UpdateData, where: WhereCondition) => Promise<Res>;
}
