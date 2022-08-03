import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserDto, UserPageDto } from 'src/pojo/dto/user.dto';
import { UserService } from 'src/service/user.service';

@ApiBearerAuth()
@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  register(@Body() user: UserDto) {
    return this.userService.register(user);
  }

  @Post('relation')
  relation(@Body() roleId: string) {
    return this.userService.relation(roleId);
  }

  @Post('page/:currentPage/:pageSize')
  page(
    @Body() userPageDto: UserPageDto,
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ) {
    return this.userService.page(currentPage, pageSize, userPageDto);
  }
}
