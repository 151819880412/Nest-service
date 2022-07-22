import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthServiceImpl } from '../service/impl/auth.service.impl';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthServiceImpl) {}

  @UseGuards(AuthGuard('local')) //守卫将从body中提取username、password，然后调用 local.strategy 中的 validate 方法，若认证通过，则将User信息赋值给request.user。
  @Public()
  @Post('/login')
  async login(@Request() req) {
    console.log(req.user);
    return this.authService.login(req.body);
  }

  //1.先执行jwt策略的 validate 方法
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getDoctorList(@Request() req) {
    // 3.验证通过，会将用户信息挂载到请求头中。
    return req.user;
  }
}

export const jwtConstants = {
  secret: 'secretKey',
};
