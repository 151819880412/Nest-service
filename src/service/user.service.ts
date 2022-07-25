import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/pojo/dto/user.dto';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { Connection, Repository } from 'typeorm';
import { BaseService } from './BaseService';
import { R } from 'src/response/R';

@Injectable()
// export class UserService {
//   // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
//   constructor(
//     @InjectRepository(UserEntity)
//     private readonly userRepository: Repository<UserEntity>,
//     private connection: Connection,
//   ) {}
//   // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
//   async findAll(): Promise<UserEntity[]> {
//     return await this.userRepository.query('select * from user');
//   }

//   async register(user: UserDto) {
//     // return await this.userRepository.query('select * from user');
//   }
// }
export class UserService extends BaseService<UserDto> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super(userRepository);
  }
  async register(user: UserDto) {
    const userOne = await this.findOne({
      where: { username: user.username },
    });
    if (!userOne) {
      return await this.saveOne(user);
    } else {
      return R.err('用户已存在');
    }
  }
}
