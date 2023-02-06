import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { MenuItemsDto } from 'src/pojo/dto/menu.dto';
import MenuEntity from 'src/pojo/entity/menu.entity';
import { R, Res } from 'src/response/R';
import { sortTree } from 'src/utils';
import { DataSource } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';

@Injectable()
export class MenuServiceImpl extends BaseQueryBuilderService<MenuEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'menu', MenuEntity);
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

    return trees;
  }

  async queryRoleById({ roleId }: { roleId: string }): Promise<Res> {
    const role = await this.relationFindOne({ roleId: roleId });
    if (!role) return R.err('角色不存在');
    return R.ok('成功', role);
  }

  async queryAllMenuList(): Promise<any> {
    const trees = await this.dataSource
      .getTreeRepository(MenuEntity)
      .findTrees();

    // // 返回所有
    // const trees = await getTreeRepository(MenuEntity).findTrees()
    // // 返回根
    // const roots = await getTreeRepository(MenuEntity).findRoots()
    // // 返回子 Tree
    // const a11 = await MenuEntity.findOne({ name: 'a11' })
    // const children = await getTreeRepository(MenuEntity).findDescendantsTree(a11)
    // // 返回父级
    // const a11 = await MenuEntity.findOne({ name: 'a11' })
    // const parent = await getTreeRepository(MenuEntity).findAncestorsTree(a11)

    return {
      results: sortTree(trees, 'sort'),
      total: -1,
    };
  }

  async queryMenuById(menuId: string): Promise<Res> {
    const data = await this.findOne({ menuId: menuId });
    return R.ok('查询成功', data);
  }

  async queryParentMenuById(menuId: string): Promise<Res> {
    const data = await this.findOne({ menuId: menuId });
    const parent = await this.dataSource
      .getTreeRepository(MenuEntity)
      .findAncestorsTree(data);
    return R.ok('查询成功', parent);
  }

  async editorMenuItems(menuItemsDto: MenuItemsDto): Promise<Res> {
    const data = await this.update(menuItemsDto, {
      menuId: menuItemsDto.menuId,
    });
    return R.ok('编辑成功', data);
  }

  async addMenuItems(menuItemsDto: MenuItemsDto): Promise<Res> {
    const parent = await this.findOne({ menuId: menuItemsDto.menuId });
    if (menuItemsDto.menuId) {
      const obj = Object.assign(new MenuEntity(), {
        ...menuItemsDto,
        parent,
        menuId: undefined,
      });
      const data = await this.dataSource.manager.save(
        plainToClass(MenuEntity, obj),
      );
      return R.ok('新增成功', data);
    }
    const data = await this.dataSource.manager.save(
      plainToClass(MenuEntity, menuItemsDto),
    );
    return R.ok('新增成功', data);
  }

  async delMenuItems(menuId: string): Promise<Res> {
    const menu = await this.findOne({ menuId: menuId });
    if (!menu) {
      return R.ok('删除失败');
    }
    // const children = await this.dataSource.manager
    //   .getTreeRepository(MenuEntity)
    //   .createDescendantsQueryBuilder('menu', 'categoryClosure', menu)
    //   .andWhere(`menu.parentId = ${menu.id}`)
    //   .getMany();

    // const children = await this.dataSource.manager
    //   .getTreeRepository(MenuEntity)
    //   .findDescendantsTree(menu);

    // const children = await this.dataSource.manager
    //   .getTreeRepository(MenuEntity)
    //   .findDescendants(menu, {
    //     relations: [`parent`],
    //   });

    // const children = await this.dataSource.manager
    //   .getTreeRepository(MenuEntity)
    //   .findDescendantsTree(menu);

    // const children = await this.dataSource.manager
    //   .getTreeRepository(MenuEntity)
    //   .findDescendants(menu);
    // children.forEach(async (item) => {
    //   await this.dataSource.manager.remove(item);
    // });
    await this.dataSource.manager.remove(menu);

    return R.ok('删除成功');
  }
}
