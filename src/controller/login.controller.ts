import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserDto } from 'src/pojo/dto/user.dto';
import { UserChangePwdDto } from 'src/pojo/dto/userChangePwd.dto';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { TokenType } from 'src/service/impl/auth.service.impl';
import { LoginService } from 'src/service/login.service';

@ApiBearerAuth()
@ApiTags('用户')
@Controller('auth')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Public()
  @Post('login')
  login(@Body() user: UserDto) {
    return this.userService.login(user);
  }

  /**
   * 登录/注册
   * @date 2022-07-27
   * @returns {any}
   */
  @Public()
  @Post('registerLogin')
  registerLogin(@Body() user: UserEntity): Promise<TokenType> {
    return this.userService.registerLogin(user);
  }

  /**
   * 修改密码
   * @date 2022-07-27
   * @returns {any}
   */
  @Public()
  @Post('changePwd')
  changePwd(@Body() user: UserChangePwdDto) {
    return this.userService.changePwd(user);
  }

  @Post('test')
  test() {
    // return this.userService.login(user);
    return {};
  }
}
