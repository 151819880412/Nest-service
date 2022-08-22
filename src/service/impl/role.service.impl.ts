import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../pojo/entity/role.entity';
import { plainToInstance } from 'class-transformer';
import { RolePageDto } from 'src/pojo/dto/role.dto';
import { BaseQueryBuilderService } from '../BaseQueryBuilder.service';
import { R, Res } from 'src/response/R';

@Injectable()
export class RoleServiceImpl extends BaseQueryBuilderService<RoleEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource, 'role', RoleEntity);
  }
  async addRole(role: RoleEntity): Promise<any> {
    console.log(role);
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
    const role = await this.relationFindOne({ roleId: roleId });
    if (!role) return R.err('角色不存在');
    return R.ok('成功', role);
  }
}
