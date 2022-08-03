import { Controller, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { PermissionServiceImpl } from 'src/service/impl/permission.service.impl';

@ApiBearerAuth()
@ApiTags('权限')
@Controller('permission')
export class MenuController {
  constructor(private readonly menuService: PermissionServiceImpl) {}

  @Public()
  @Get('queryRoleMenuList')
  register(@Param() userId: string) {
    console.log(userId);
    return this.menuService.getMenuList('userId');
  }
}
