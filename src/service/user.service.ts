import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto, UserPageDto } from 'src/pojo/dto/user.dto';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { Connection, DataSource, Repository } from 'typeorm';
import { BaseService } from './BaseService';
import { R } from 'src/response/R';
import { RoleEntity } from 'src/pojo/entity/role.entity';

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
    private readonly dataSource: DataSource,
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

  async page(currentPage: number, pageSize: number, user: UserPageDto) {
    console.log(typeof currentPage, typeof pageSize);
    console.log(user);
    // let qb = this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user');
    // qb = qb.where(user as Partial<UserEntity>);
    // qb = qb.orderBy('created_time', 'DESC');
    // qb = qb.skip(pageSize * (pageSize - 1)).take(pageSize);
    // return await qb.getManyAndCount();

    // 或使用 .getMany() 不会返回总数

    const result: [UserEntity[], number] = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where({ ...user, delFlag: 0 })
      .skip(pageSize * (currentPage - 1))
      .take(pageSize)
      .getManyAndCount();

    return R.ok('成功', { total: result[1], results: result[0] });
  }

  async relation(roleId: string) {
    // 使用中间表插入成功
    // const user = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .where('user.userId = :userId', {
    //     userId: '76a2b794-0fdd-4fc7-b769-0e69e0fdc92c',
    //   })
    //   .getOne();
    // const role = await this.dataSource
    //   .getRepository(RoleEntity)
    //   .createQueryBuilder('role')
    //   .where('role.roleId = :roleId', {
    //     roleId: 'f24ee27c-65c7-4c25-9b14-5d576b69b191',
    //   })
    //   .getOne();
    // user.roles = [role];
    // console.log(user);
    // console.log(role);
    // const aaa = await this.dataSource.manager.save(user);
    // console.log(aaa);
    // return aaa;

    // 使用中间表查询成功
    // const questionRepository = this.dataSource.getRepository(UserEntity);
    // const questions = await questionRepository.find({
    //   relations: ['roles'],
    // });
    // console.log(questions);

    // const list = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.roles', 'role')
    //   .where('user.userId = :id', {
    //     id: '76a2b794-0fdd-4fc7-b769-0e69e0fdc92c',
    //   })
    //   .getOne();
    // console.log(list);
    // return list;

    // 不适用中间表
    const user = await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .where('user.userId = :userId', {
        userId: '76a2b794-0fdd-4fc7-b769-0e69e0fdc92c',
      })
      .getOne();
    const role = await this.dataSource
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .where('role.roleId = :roleId', {
        roleId: 'f24ee27c-65c7-4c25-9b14-5d576b69b191',
      })
      .getOne();
    console.log(role);
    console.log(user);
    user.roles.push(role.roleId);
    const aaa = await this.dataSource.manager.save(user);
    console.log(aaa);
    return aaa;
  }
}
