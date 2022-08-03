import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
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
}
