// BaseQueryBuilderService.ts
import { Brackets, DataSource, EntityTarget, ObjectLiteral } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { fuzzyquery } from 'src/utils/Fuzzyquery';
import { R, Res } from 'src/response/R';
/**
 * 服务基类,实现一些共有的基本方法,这样就不用每个服务类在写一遍了,直接继承该类即可
 */
@Injectable()
export class BaseQueryBuilderService<E> {
  dataSource: DataSource;
  dataSourceStr: string;
  entity: EntityTarget<E>;
  constructor(
    dataSource: DataSource,
    dataSourceStr: string,
    entity: EntityTarget<E>,
  ) {
    this.dataSource = dataSource;
    this.dataSourceStr = dataSourceStr;
    this.entity = entity;
  }

  /**
   * 分页查询
   * @date 2022-08-09
   * @param {any} currentPage:number
   * @param {any} pageSize:number
   * @param {any} data:T
   * @param {any} database:string
   * @param {any} entity:EntityTarget<E>
   * @returns {any}
   */
  async findPage<T, E>(
    currentPage: number,
    pageSize: number,
    data: T,
    selectCondition: Array<string> = null,
  ): Promise<Res> {
    const result: [ObjectLiteral[], number] = await this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder(this.dataSourceStr)
      .where(fuzzyquery(data))
      .orderBy(`${this.dataSourceStr}.createdTime`, 'DESC')
      .skip(pageSize * (currentPage - 1))
      .take(pageSize)
      .select(selectCondition)
      .getManyAndCount();
    return R.ok('成功', { total: result[1], results: result[0] });
  }

  // async findOne(condition: object) {
  //   const data = await this.dataSource
  //     .getRepository(this.entity)
  //     .createQueryBuilder(this.dataSourceStr)
  //     .where(condition)
  //     .getOne();
  //   console.log(data);
  //   return data;
  // }

  // async findOne(whereStr: string, whereData: object) {
  //   const data = await this.dataSource
  //     .getRepository(this.entity)
  //     .createQueryBuilder(this.dataSourceStr)
  //     .where(whereStr, whereData)
  //     .getOne();
  //   console.log(data);
  //   return data;
  // }

  async findOne(
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ) {
    const data = await this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder(this.dataSourceStr)
      .where(where, parameters)
      .getOne();
    return data;
  }

  async update(
    values: any,
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ) {
    const data = this.dataSource
      .createQueryBuilder()
      .update(this.entity)
      .set(values)
      .where(where, parameters)
      .execute();
    return data;
  }

  async delete(
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ) {
    const data = this.dataSource
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where(where, parameters)
      .execute();
    return data;
  }
}
