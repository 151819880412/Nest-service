import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { UserDto } from 'src/pojo/dto/user.dto';
import { LoginService } from 'src/service/login.service';

@ApiBearerAuth()
@ApiTags('用户')
@Controller('login')
export class LoginController {
  constructor(private readonly userService: LoginService) {}

  @Public()
  @Post()
  login(@Body() user: UserDto) {
    return this.userService.login(user);
  }

  @Post('test')
  test() {
    // return this.userService.login(user);
    return {};
  }
}
