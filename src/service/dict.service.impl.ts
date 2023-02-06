import { Injectable } from '@nestjs/common';
import DictEntity from 'src/pojo/entity/dict.entity';
import { DataSource } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';
import { R, Res } from 'src/response/R';
import { plainToInstance } from 'class-transformer';
import * as _ from 'lodash';

@Injectable()
export class DictServiceImpl extends BaseQueryBuilderService<DictEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'dict', DictEntity);
  }

  // 分页查询
  async queryDictListByPage(
    currentPage: number,
    pageSize: number,
    dictEntity: DictEntity,
  ): Promise<Res<DictEntity>> {
    const data = await this.findPage(currentPage, pageSize, dictEntity);
    return data;
  }

  // 新增
  async addDict(data: DictEntity): Promise<Res> {
    const dict = await this.findOne({
      cnName: data.cnName,
      enName: data.enName,
      dictType: data.dictType,
    });
    if (!dict) {
      const entity = plainToInstance(DictEntity, data); // 解决创建用户时 @BeforeInsert 不执行
      await this.saveOne(entity);
      return R.ok('新增成功');
    } else {
      return R.err('字典已存在');
    }
  }

  // 根据id查询
  async queryDictById(dictId: string) {
    const role = await this.findOne({ dictId });
    return R.ok('查询成功', role);
  }

  // 根据字典类型查询
  async queryDictByDictType(dictTypeList: string[]) {
    const results = await this.dataSource
      .getRepository(DictEntity)
      .createQueryBuilder('entity')
      .where('entity.dictType IN (:...dictTypeList)', { dictTypeList })
      .getMany();
    // const role = await this.findOne({ dictId });
    const grouped = results.reduce((acc, curr) => {
      const group = acc[curr.dictType] || [];
      acc[curr.dictType] = [...group, curr];
      return acc;
    }, {});

    return R.ok('查询成功', grouped);
  }

  // 编辑
  async editorDict(dict: DictEntity): Promise<Res> {
    const data = await this.update<DictEntity>(dict, {
      dictId: dict.dictId,
    });
    return data;
  }

  // async changeState({ dictId }: { dictId: string }): Promise<Res> {
  //   const role = await this.findOne({ dictId: dictId });
  //   if (!role) return R.err('字典不存在');
  //   if (role.state == 0) {
  //     role.state = 1;
  //   } else {
  //     role.state = 0;
  //   }
  //   const updateUser = await this.update(role, { dictId: dictId });
  //   if (updateUser.affected == 1) {
  //     return R.ok('更新成功');
  //   } else {
  //     return R.err('更新失败');
  //   }
  // }
}
