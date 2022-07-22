import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
  HttpException,
  HttpStatus,
  UseFilters,
  Put,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Protocol } from 'src/common/decorators/prorocol.decorator';
import { LoginDto } from 'src/pojo/dto/login.dto';
import { loginServiceImpl } from 'src/service/impl/login.service.impl';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { RolesGuard } from '../common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Public, Roles } from 'src/common/decorators/public.decorator';

@ApiBearerAuth()
@ApiTags('登录')
// 局部过滤器
@UseFilters(new HttpExceptionFilter())
// 局部守卫
@UseGuards(RolesGuard)
@Controller('/login')
export class LoginController {
  constructor(private readonly loginServiceimpl: loginServiceImpl) {}

  @Post()
  login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.loginServiceimpl.login(loginDto);
  }

  // 1.先进行登录验证，执行local.strategy.ts文件中的calidate方法
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login1(@Request() req) {
    // 4.验证通过以后执行这个函数
    return this.loginServiceimpl.login(req.user);
  }

  /**
   * 自定义错误
   * @date 2022-07-13
   * @returns {any}
   */
  @Get()
  fetch(@Query() { id }): string {
    if (!id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: '缺少id',
          error: '缺少id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return '111';
  }

  /**
   * 管道
   * @date 2022-07-13
   * @param {any} ':id'
   * @returns {any}
   */
  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBody({ description: '请输入message' })
  // 有时候我们希望参数的类型是数字，则可以通过管道进行转换
  updated(@Param('id', new ParseIntPipe()) id, @Body() { message }): string {
    console.log(typeof id);
    return '111';
  }

  /**
   * 守卫
   * @date 2022-07-13
   * @param {any} '/rolesGuard'
   * @returns {any}
   */
  @Get('/rolesGuard')
  @Roles('admin')
  // @Public()
  @ApiParam({ name: 'id', description: '请输入message' })
  fetch2(@Query() { id }, @Protocol('https') protocol: string): string {
    console.log(protocol);
    return '111';
  }
}
