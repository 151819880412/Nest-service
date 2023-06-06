import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginDto } from 'src/pojo/dto/login.dto';
import { UserChangePwdDto } from 'src/pojo/dto/userChangePwd.dto';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { R, Res } from 'src/response/R';
import { TokenType } from 'src/service/impl/auth.service.impl';
import { LoginService } from 'src/service/login.service';

@ApiBearerAuth()
@ApiTags('用户')
@Controller('auth')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Public()
  @Post('login')
  login(@Body() user: LoginDto) {
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
  changePwd(@Body() user: UserChangePwdDto): Promise<Res> {
    return this.userService.changePwd(user);
  }

  @Get('/logOut')
  logOut(@Query('userId') userId: string): Promise<Res<number>> {
    return this.userService.logOut(userId);
  }

  @Public()
  @Post('test')
  test() {
    const str = `<template>
    <div>
      <h1>Welcome to My Vue App</h1>
      <p>{{ message }}</p>
      <button @click="handleClick">Click Me</button>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'FileComponent',
    setup() {
      const message = ref('Hello, Vue!');

      function handleClick() {
        console.log('Button clicked');
      }

      return {
        message,
        handleClick,
      };
    },
  });
  </script>

  <style scoped>
  h1 {
    color: #333;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
  }
  </style>
  `;
    return R.ok('111', str);
  }

  @Public()
  @Post('register')
  register(@Body() user: LoginDto) {
    return this.userService.register(user);
  }
}
