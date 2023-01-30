import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../pojo/entity/role.entity';
import { plainToInstance } from 'class-transformer';
import { RoleEditorDto, RolePageDto } from 'src/pojo/dto/role.dto';
import { BaseQueryBuilderService } from '../BaseQueryBuilder.service';
import { R, Res } from 'src/response/R';
import RoleMenuEntity from 'src/pojo/entity/role-menu.entity';
import * as _ from 'lodash';
import MenuEntity from 'src/pojo/entity/menu.entity';

@Injectable()
export class RoleServiceImpl extends BaseQueryBuilderService<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'role', RoleEntity);
  }
  async addRole(role: RoleEntity): Promise<any> {
    const entity = plainToInstance(RoleEntity, role); // 解决创建用户时 @BeforeInsert 不执行

    const data = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values(entity)
      .execute();
    return data;
  }

  /**
   * 角色分页
   * @date 2022-08-10
   * @param {any} currentPage:number
   * @param {any} pageSize:number
   * @param {any} role:RolePageDto
   * @returns {any}
   */
  async rolePage(
    currentPage: number,
    pageSize: number,
    role: RolePageDto,
  ): Promise<Res> {
    const data = await this.findPage(currentPage, pageSize, role);
    return data;
  }

  /**
   * 启用/禁用
   * @date 2022-08-09
   * @param {any} {roleId}:{roleId:string}
   * @returns {any}
   */
  async changeState({ roleId }: { roleId: string }): Promise<Res> {
    const role = await this.findOne({ roleId: roleId });
    if (!role) return R.err('角色不存在');
    if (role.state == 0) {
      role.state = 1;
    } else {
      role.state = 0;
    }
    const updateUser = await this.update(role, { roleId: roleId });
    if (updateUser.affected == 1) {
      return R.ok('更新成功');
    } else {
      return R.err('更新失败');
    }
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} {roleId}:{roleId:string}
   * @returns {any}
   */
  async changeDelFlag({ roleId }: { roleId: string }): Promise<Res> {
    const role = await this.findOne({ roleId: roleId });
    if (!role) return R.err('角色不存在');
    if (role.delFlag == 0) {
      role.delFlag = 1;
    }
    const updateUser = await this.update(role, { roleId: roleId });

    if (updateUser.affected == 1) {
      return R.ok('更新成功');
    } else {
      return R.err('更新失败');
    }
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} {roleId}:{roleId:string}
   * @returns {any}
   */
  async delUser({ roleId }: { roleId: string }): Promise<Res> {
    const data = await this.delete({ roleId });
    if (data.affected == 1) {
      return R.ok('删除成功');
    } else {
      return R.err('角色不存在');
    }
  }

  /**
   * 根据id查询用户
   * @date 2022-08-10
   * @param {any} {roleId}:{roleId:string}
   * @returns {any}
   */
  async queryRoleById({ roleId }: { roleId: string }): Promise<Res> {
    // const trees = await this.dataSource
    //   .getTreeRepository(MenuEntity)
    //   .findTrees();

    const role = await this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder(this.dataSourceStr)
      .where({ roleId })
      .getOne();
    if (!role) return R.err('角色不存在');

    const AllMenu = await this.dataSource
      .getTreeRepository(MenuEntity)
      .findTrees();

    const list: any = (await this.dataSource
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .innerJoin(RoleMenuEntity, 'roleMenu', 'role.roleId = roleMenu.roleId')
      .innerJoinAndMapMany(
        'role.list',
        MenuEntity,
        'menu',
        'menu.menuId = roleMenu.menuId',
      )
      .where({ roleId })
      .getOne()) || { lise: [] };

    const selectTree = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length > 0) {
          list?.list?.forEach((item) => {
            if (item.menuId == arr[i].menuId && item.parentId) {
              arr[i].isCheck = true;
            }
          });
          selectTree(arr[i].children);
        } else {
          list?.list?.forEach((item) => {
            if (item.menuId == arr[i].menuId && item.parentId) {
              arr[i].isCheck = true;
            }
          });
        }
      }
    };
    selectTree(AllMenu);
    return R.ok('成功', {
      ...role,
      menus: AllMenu,
    });
  }

  /**
   * 编辑角色
   * @date 2022-08-23
   * @param {any} roles
   * @returns {any}
   */
  async editor(roles: RoleEditorDto): Promise<Res> {
    const role = await this.findOne({ roleId: roles.roleId });
    if (!role) return R.err('角色不存在');

    // 获取连接并创建新的queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 开始事务：
    await queryRunner.startTransaction();
    try {
      await this.update(_.pick(roles, _.keys(role)), {
        roleId: role.roleId,
      });
      await this.relationDelete(RoleMenuEntity, { roleId: role.roleId });
      const dto = plainToInstance(
        RoleMenuEntity,
        roles.menus.map((item) => {
          return {
            roleId: role.roleId,
            menuId: item,
          };
        }),
      );
      await this.relationSaveOne<RoleMenuEntity>(RoleMenuEntity, dto);
      return R.ok('成功');
    } catch (error) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      new Error('回滚' + error);
      return R.err('回滚' + error);
    } finally {
      await queryRunner.release();
    }
  }
}
