import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { RolePageDto } from 'src/pojo/dto/role.dto';
import { Res } from 'src/response/R';
import { RoleEntity } from '../pojo/entity/role.entity';
import { RoleServiceImpl } from '../service/impl/role.service.impl';

@ApiBearerAuth()
@ApiTags('角色')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleServiceImpl) {}

  @Public()
  @Post('add')
  addRole(@Body() role: RoleEntity) {
    return this.roleService.addRole(role);
  }

  @Post('page/:currentPage/:pageSize')
  rolePage(
    @Body() rolePageDto: RolePageDto,
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ) {
    return this.roleService.rolePage(currentPage, pageSize, rolePageDto);
  }

  /**
   * 启用禁用
   * @date 2022-08-09
   * @param {any} '/changeState'
   * @returns {any}
   */
  @Post('/changeState')
  changeState(@Body() data: { roleId: string }): Promise<Res> {
    return this.roleService.changeState(data);
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} '/changeDelFlag'
   * @returns {any}
   */
  @Post('/changeDelFlag')
  changeDelFlag(@Body() data: { roleId: string }): Promise<Res> {
    return this.roleService.changeDelFlag(data);
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} '/delUser'
   * @returns {any}
   */
  @Post('/delUser')
  delUser(@Body() data: { roleId: string }): Promise<Res> {
    return this.roleService.delUser(data);
  }

  /**
   * 根据id查询用户
   * @date 2022-08-10
   * @param {any} '/delUser'
   * @returns {any}
   */
  @Post('/queryRoleById')
  queryRoleById(@Body() data: { roleId: string }): Promise<Res> {
    return this.roleService.queryRoleById(data);
  }
}
