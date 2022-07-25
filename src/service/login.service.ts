import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { Connection, Repository } from 'typeorm';
import { BaseService } from './BaseService';
import { R } from 'src/response/R';
import { LoginDto } from '../pojo/dto/login.dto';
import { AuthServiceImpl } from './impl/auth.service.impl';

@Injectable()
export class LoginService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthServiceImpl,
  ) {
    super(userRepository);
  }
  async login(user: LoginDto) {
    const userOne: UserEntity = await this.findOne({
      where: { username: user.username },
    });
    if (!userOne) {
      return R.err('用户名不存在');
    }
    if (user.password !== userOne.password) {
      return R.err('密码错误');
    }
    const data = await this.authService.getToken(userOne);
    return data;
  }
}
