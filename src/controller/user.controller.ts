import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { UserDto } from 'src/pojo/dto/user.dto';
import { UserService } from 'src/service/user.service';

@Controller('user')
export class UserController {
  [x: string]: any;
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  async register(@Body() user: UserDto) {
    return this.userService.register(user);
  }

  //定义一个路由
  // @Get('/')
  // async getUser(): Promise<UserDto> {
  //   const user = await this.userRepository.save({
  //     name: 'user1',
  //     password: 'pass1',
  //   });
  //   return await this.userService.findOne({
  //     where: { username: '1' },
  //   });
  // }
}
