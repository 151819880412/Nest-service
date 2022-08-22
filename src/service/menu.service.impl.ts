import { Injectable } from '@nestjs/common';
import MenuEntity from 'src/pojo/entity/menu.entity';
import { R, Res } from 'src/response/R';
import { DataSource } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';

@Injectable()
export class PermissionServiceImpl extends BaseQueryBuilderService<MenuEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'permission', MenuEntity);
  }
  async getMenuList(UserId: string): Promise<any> {
    // const firstUser = await this.dataSource
    //   .getRepository(PermissionEntity)
    //   .createQueryBuilder('category')
    //   .getMany();
    // console.log(firstUser);

    const trees = await this.dataSource
      .getTreeRepository(MenuEntity)
      .findTrees();

    console.log(trees);

    return trees;
  }

  async queryRoleById({ roleId }: { roleId: string }): Promise<Res> {
    const role = await this.relationFindOne({ roleId: roleId });
    if (!role) return R.err('角色不存在');
    return R.ok('成功', role);
  }
}
