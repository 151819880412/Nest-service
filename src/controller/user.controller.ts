import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserDto, UserPageDto } from 'src/pojo/dto/user.dto';
import { Res } from 'src/response/R';
import { UserService } from 'src/service/user.service';

@ApiBearerAuth()
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 登录/注册
   * @date 2022-08-09
   * @returns {any}
   */
  @Public()
  @Post('register')
  register(@Body() user: UserDto) {
    return this.userService.register(user);
  }

  /**
   * 关联角色
   * @date 2022-08-09
   * @param {any} 'relation'
   * @returns {any}
   */
  @Post('relation')
  relation(@Body() roleId: string) {
    return this.userService.relation(roleId);
  }

  /**
   * 分页
   * @date 2022-08-09
   * @param {any} @Body(
   * @returns {any}
   */
  @Post('page/:currentPage/:pageSize')
  page(
    @Body() userPageDto: UserPageDto,
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ): Promise<Res> {
    return this.userService.page(currentPage, pageSize, userPageDto);
  }

  /**
   * 启用禁用
   * @date 2022-08-09
   * @param {any} '/changeState'
   * @returns {any}
   */
  @Post('/changeState')
  changeState(@Body() data: { userId: string }): Promise<Res> {
    return this.userService.changeState(data);
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} '/changeDelFlag'
   * @returns {any}
   */
  @Post('/changeDelFlag')
  changeDelFlag(@Body() data: { userId: string }): Promise<Res> {
    return this.userService.changeDelFlag(data);
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} '/delUser'
   * @returns {any}
   */
  @Post('/delUser')
  delUser(@Body() data: { userId: string }): Promise<Res> {
    return this.userService.delUser(data);
  }
}
