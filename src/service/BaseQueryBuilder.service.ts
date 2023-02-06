// BaseQueryBuilderService.ts
import {
  Brackets,
  DataSource,
  DeleteResult,
  EntityTarget,
  InsertResult,
  ObjectLiteral,
  UpdateResult,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { fuzzyquery } from 'src/utils/Fuzzyquery';
import { R, Res } from 'src/response/R';
/**
 * 服务基类,实现一些共有的基本方法,这样就不用每个服务类在写一遍了,直接继承该类即可
 */
@Injectable()
export class BaseQueryBuilderService<E> {
  dataSource?: DataSource;
  dataSourceStr?: string;
  entity?: EntityTarget<E>;
  constructor(
    dataSource?: DataSource,
    dataSourceStr?: string,
    entity?: EntityTarget<E>,
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
  async findPage<T>(
    currentPage: number,
    pageSize: number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: T | {},
    selectCondition: Array<string> = null,
  ): Promise<Res<T>> {
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

  /**
   * 查询单个
   * @date 2022-08-17
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async findOne(
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ): Promise<E> {
    const data = await this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder(this.dataSourceStr)
      .where(where, parameters)
      .getOne();
    return data;
  }

  /**
   * 关联查询单个
   * @date 2022-08-17
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async relationFindOne(
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ): Promise<E> {
    const data = await this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder(this.dataSourceStr)
      // .leftJoinAndSelect(Article, 'article', 'user.id = article.createBy')
      .where(where, parameters)
      .getOne();
    return data;
  }

  /**
   * 查询多个
   * @date 2022-08-17
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async findMany(
    entity?: EntityTarget<E>,
    dataSourceStr?: string,
    where?: object,
  ): Promise<any> {
    const data = await this.dataSource
      .getRepository(entity || this.entity)
      .createQueryBuilder(dataSourceStr || this.dataSourceStr)
      .where(Object.assign({}, { delFlag: 0 }, where))
      .getMany();
    return data;
  }

  /**
   * 保存单个
   * @date 2022-08-17
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async saveOne(entity): Promise<InsertResult> {
    const data = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(this.entity)
      .values(entity)
      .execute();
    return data;
  }

  /**
   * 关联保存
   * @date 2022-08-17
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async relationSaveOne<T>(
    entity: EntityTarget<T>,
    obj,
  ): Promise<InsertResult> {
    const data = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(entity)
      .values(obj)
      .execute();
    return data;
  }

  /**
   * 关联保存
   * @date 2022-08-17
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async relationDelete<T>(
    entity: EntityTarget<T>,
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ): Promise<DeleteResult> {
    const data = this.dataSource
      .createQueryBuilder()
      .delete()
      .from(entity)
      .where(where, parameters)
      .execute();
    return data;
  }

  /**
   * 更新
   * @date 2022-08-17
   * @param {any} values:any
   * @param {any} where:|string|((qb:this
   * @returns {any}
   */
  async update<T>(
    values: any,
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ): Promise<Res<T>> {
    const data = await this.dataSource
      .createQueryBuilder()
      .update(this.entity)
      .set(values)
      .where(where, parameters)
      .returning('*')
      .execute()
      .then((result) => result.raw[0]);
    if (data) {
      return R.ok('修改成功', data);
    } else {
      return R.err('修改失败');
    }
  }

  // 原始更新方法
  // async update(
  //   values: any,
  //   where:
  //     | string
  //     | ((qb: this) => string)
  //     | Brackets
  //     | ObjectLiteral
  //     | ObjectLiteral[],
  //   parameters?: ObjectLiteral,
  // ): Promise<UpdateResult> {
  //   const data = this.dataSource
  //     .createQueryBuilder()
  //     .update(this.entity)
  //     .set(values)
  //     .where(where, parameters)
  //     .execute();
  //   return data;
  // }

  /**
   * 删除
   * @date 2022-08-17
   * @param {any} (qb:this
   * @returns {any}
   */
  async delete(
    where:
      | string
      | ((qb: this) => string)
      | Brackets
      | ObjectLiteral
      | ObjectLiteral[],
    parameters?: ObjectLiteral,
  ): Promise<DeleteResult> {
    const data = this.dataSource
      .createQueryBuilder()
      .delete()
      .from(this.entity)
      .where(where, parameters)
      .execute();
    return data;
  }
}
