import { Injectable } from '@nestjs/common';
import { DataBase } from 'src/pojo/database.';
import { R } from 'src/response/R';
import { QueryRunner, Table, createConnection } from 'typeorm';
import { Res } from '../../response/R';
import {
  DatabaseService,
  UpdateData,
  WhereCondition,
} from '../Database.service';
import { DatabaseDto } from 'src/pojo/dto/database.dto';

@Injectable()
export class DatabaseServiceImpl implements DatabaseService {
  async createTable(
    data: DatabaseDto,
    queryRunner: QueryRunner,
  ): Promise<void> {
    if (data.isPrimary) {
      if (
        data.columns.filter((item) => item.name == data.isPrimary).length > 0
      ) {
        data.columns.filter(
          (item) => item.name == data.isPrimary,
        )[0].isPrimary = true;
        data.columns.filter(
          (item) => item.name == data.isPrimary,
        )[0].generationStrategy = 'uuid';
      }
      if (Array.isArray(data.isUnique)) {
        data.indices = [
          {
            isUnique: true,
            columnNames: data.isUnique,
          },
        ];
      }
    }
    await queryRunner.createTable(
      new Table(data),
      // new Table({
      //   name: 'aaa',

      //   columns: [
      //     { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
      //     {
      //       name: 'username',
      //       type: 'varchar',
      //       length: '20',
      //       isNullable: false,
      //     },
      //     {
      //       name: 'password',
      //       type: 'varchar',
      //       length: '20',
      //       isNullable: false,
      //     },
      //     { name: 'phone', type: 'varchar', length: '20', isNullable: true },
      //     { name: 'type', type: 'varchar', length: '20', isNullable: false },
      //     // 主键 唯一且不能为空
      //     {
      //       name: 'userId',
      //       type: 'uuid',
      //       generationStrategy: 'uuid',
      //       isPrimary: true,
      //     },
      //     { name: 'state', type: 'integer', default: 0 },
      //     { name: 'del_flag', type: 'integer', default: 0 },
      //     { name: 'created_time', type: 'timestamp', isNullable: true },
      //     { name: 'updated_time', type: 'timestamp', isNullable: true },
      //   ],
      //   // 索引 提高查询速度
      //   indices: [
      //     {
      //       isUnique: true,
      //       columnNames: ['id', 'username'],
      //     },
      //   ],
      // }),
    );
  }

  async dropTable(tableName: string, queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }

  // public async up(data: TableOptions, queryRunner: QueryRunner): Promise<void> {
  //   await queryRunner.createTable(
  //     new Table({
  //       name: 'aaa',

  //       columns: [
  //         { name: 'id', type: 'integer', isPrimary: true, isGenerated: true },
  //         {
  //           name: 'username',
  //           type: 'varchar',
  //           length: '20',
  //           isNullable: false,
  //         },
  //         {
  //           name: 'password',
  //           type: 'varchar',
  //           length: '20',
  //           isNullable: false,
  //         },
  //         { name: 'phone', type: 'varchar', length: '20', isNullable: true },
  //         { name: 'type', type: 'varchar', length: '20', isNullable: false },
  //         // {
  //         //   name: 'userId',
  //         //   type: 'uuid',
  //         //   generationStrategy: 'uuid',
  //         //   isPrimary: true,
  //         // },
  //         { name: 'state', type: 'integer', default: 0 },
  //         { name: 'del_flag', type: 'integer', default: 0 },
  //         { name: 'created_time', type: 'timestamp', isNullable: true },
  //         { name: 'updated_time', type: 'timestamp', isNullable: true },
  //       ],
  //       indices: [
  //         {
  //           name: 'aaa1',
  //           isUnique: true,
  //           columnNames: ['id', 'username'],
  //         },
  //         // {
  //         //   name: 'aaa2',
  //         //   isUnique: true,
  //         //   columnNames: ['userId'],
  //         // },
  //       ],
  //     }),
  //   );
  // }

  // public async down(
  //   tableName: string,
  //   queryRunner: QueryRunner,
  // ): Promise<void> {
  //   await queryRunner.dropTable(tableName);
  // }

  public async add(tableName: string, data: any): Promise<Res> {
    const connection = await createConnection(); // 获取 TypeORM 的 Connection 对象
    const queryRunner = connection.createQueryRunner(); // 获取 QueryRunner 对象
    await queryRunner.connect(); // 连接数据库
    await queryRunner.startTransaction(); // 开始事务
    // 获取表的字段列表
    const columns = (
      await connection.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`,
      )
    ).map((column: { column_name: string }) => column.column_name);

    // 选择表中有的字段进行更新
    const values: any = {};
    Object.keys(data).forEach((key) => {
      if (columns.includes(key)) {
        values[key] = data[key];
      }
    });
    try {
      const base = new DataBase();
      console.log(base, 111);
      const res = await queryRunner.manager.insert(
        tableName,
        Object.assign(values, base),
      );
      await queryRunner.commitTransaction(); // 提交事务
      return R.ok('请求成功', res);
    } catch (err) {
      await queryRunner.rollbackTransaction(); // 回滚事务
      throw err;
    } finally {
      // 关闭数据库连接
      await connection.close();
      await queryRunner.release(); // 释放 QueryRunner 对象
    }
  }

  public async findById(tableName: string, id: string): Promise<DataBase[]> {
    const connection = await createConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    try {
      const query = `SELECT * FROM "${tableName}" WHERE id = '${id}'`;
      const result = await connection.query(query);
      return result;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
      await connection.close();
    }
  }

  async update(
    tableName: string,
    updateData: UpdateData,
    where: WhereCondition,
  ): Promise<Res> {
    const connection = await createConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const qb = connection.createQueryBuilder().update(tableName);

      // 获取表的字段列表
      const columns = (
        await connection.query(
          `SELECT column_name FROM information_schema.columns WHERE table_name = '${tableName}'`,
        )
      ).map((column: { column_name: string }) => column.column_name);

      // 选择表中有的字段进行更新
      const values: any = {};
      Object.keys(updateData).forEach((key) => {
        if (columns.includes(key)) {
          values[key] = updateData[key];
        }
      });
      qb.set(values);

      // 构建 WHERE 子句
      Object.keys(where).forEach((key) => {
        qb.andWhere(`${key} = :${key}`, where);
      });

      const result = await qb.execute();
      await queryRunner.commitTransaction();

      if (result.affected > 0) {
        return R.ok('请求成功');
      }
      return R.err('请求失败');
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
      await connection.close();
    }
  }
}
