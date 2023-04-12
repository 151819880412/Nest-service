import { Injectable } from '@nestjs/common';
import TemplateMaintainEntity from 'src/pojo/entity/templateMaintain.entity';
import { DataSource } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';
import { R, Res } from 'src/response/R';
import { plainToInstance } from 'class-transformer';
import { TemplateMaintainDto } from 'src/pojo/dto/templateMaintain.dto';

@Injectable()
export class TemplateMaintainServiceImpl extends BaseQueryBuilderService<TemplateMaintainEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'templateMaintain', TemplateMaintainEntity);
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
  async queryTemplateById(templateMaintainId: string) {
    const role = await this.findOne({ templateMaintainId });
    return R.ok('查询成功', role);
  }

  // 编辑
  async editorTemplate(templateMaintain: TemplateMaintainDto): Promise<Res> {
    const data = await this.update<TemplateMaintainEntity>(templateMaintain, {
      templateMaintainId: templateMaintain.templateMaintainId,
    });
    return data;
  }

  // 删除
  async delTemplate(templateMaintain: TemplateMaintainEntity): Promise<Res> {
    const res = await this.findOne({
      templateMaintainId: templateMaintain.templateMaintainId,
    });
    if (!res) return R.err('模板不存在');
    if (res.delFlag == 0) {
      res.delFlag = 1;
    }
    const updateData = await this.update(res, {
      templateMaintainId: templateMaintain.templateMaintainId,
    });
    return updateData;
  }
}
