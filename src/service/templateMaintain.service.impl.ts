import { Injectable } from '@nestjs/common';
import TemplateMaintainEntity from 'src/pojo/entity/templateMaintain.entity';
import { DataSource } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';
import { R, Res } from 'src/response/R';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TemplateMaintainServiceImpl extends BaseQueryBuilderService<TemplateMaintainEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'dict', TemplateMaintainEntity);
  }

  // 分页查询
  async queryTemListByPage(
    currentPage: number,
    pageSize: number,
    dictEntity: TemplateMaintainEntity,
  ): Promise<Res<TemplateMaintainEntity>> {
    const data = await this.findPage(currentPage, pageSize, dictEntity);
    return data;
  }

  // 新增
  async addTemplate(data: TemplateMaintainEntity): Promise<Res> {
    const entity = plainToInstance(TemplateMaintainEntity, data); // 解决创建用户时 @BeforeInsert 不执行
    await this.saveOne(entity);
    return R.ok('新增成功');
  }

  // 根据id查询
  async queryTemplateById(dictId: string) {
    const role = await this.findOne({ dictId });
    return R.ok('查询成功', role);
  }

  // 编辑
  async editorTemplate(dict: TemplateMaintainEntity): Promise<Res> {
    const data = await this.update<TemplateMaintainEntity>(dict, {
      dictId: dict.templateMaintainId,
    });
    return data;
  }
}
