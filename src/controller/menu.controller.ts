import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { Res } from 'src/response/R';
import { PermissionServiceImpl } from 'src/service/menu.service.impl';

@ApiBearerAuth()
@ApiTags('权限')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: PermissionServiceImpl) {}

  @Public()
  @Get('queryRoleMenuList')
  register(@Param() userId: string) {
    console.log(userId);
    return this.menuService.getMenuList('userId');
  }

  @Post('/queryRoleMenuById')
  queryRoleById(@Body() data: { roleId: string }): Promise<Res> {
    return this.menuService.queryRoleById(data);
  }
}
