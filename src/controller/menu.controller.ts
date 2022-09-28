import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { MenuItemsDto } from 'src/pojo/dto/menu.dto';
import { Res } from 'src/response/R';
import { MenuServiceImpl } from 'src/service/menu.service.impl';

@ApiBearerAuth()
@ApiTags('权限')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuServiceImpl) {}

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

  @Get('/queryAllMenuList')
  queryAllMenuList(): Promise<Res> {
    return this.menuService.queryAllMenuList();
  }

  @Get('/queryMenuById')
  queryMenuById(@Query('menuId') menuId: string): Promise<Res> {
    return this.menuService.queryMenuById(menuId);
  }

  @Get('/queryParentMenuById')
  queryParentMenuById(@Query('menuId') menuId: string): Promise<Res> {
    return this.menuService.queryParentMenuById(menuId);
  }

  @Post('/editorMenuItems')
  editorMenuItems(@Body() menuItemsDto: MenuItemsDto): Promise<Res> {
    return this.menuService.editorMenuItems(menuItemsDto);
  }

  @Post('/addMenuItems')
  addMenuItems(@Body() menuItemsDto: MenuItemsDto): Promise<Res> {
    return this.menuService.addMenuItems(menuItemsDto);
  }

  @Get('/delMenuItems')
  delMenuItems(@Query('menuId') menuId: string): Promise<Res> {
    return this.menuService.delMenuItems(menuId);
  }
}
