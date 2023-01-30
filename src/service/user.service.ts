import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto, UserPageDto } from 'src/pojo/dto/user.dto';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';
import { R, Res } from 'src/response/R';
import { RoleEntity } from 'src/pojo/entity/role.entity';
import { plainToInstance } from 'class-transformer';
import UserRoleEntity from 'src/pojo/entity/user-role.entity';
import * as _ from 'lodash';

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
export class UserService extends BaseQueryBuilderService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    dataSource: DataSource,
  ) {
    super(dataSource, 'user', UserEntity);
  }
  // constructor(
  //   @InjectRepository(UserEntity)
  //   private readonly userRepository: Repository<UserEntity>,
  //   @InjectRepository(DataSource)
  //   dataSources: DataSource,
  //   dataSourceStr: 'user',
  // ) {
  //   super(dataSources, dataSourceStr, UserEntity);
  // }

  /**
   * 新增用户
   * @date 2022-08-17
   * @param {any} user:UserDto
   * @returns {any}
   */
  async register(user: UserDto) {
    const userOne = await this.findOne({ username: user.username });
    if (!userOne) {
      const entity = plainToInstance(UserEntity, user); // 解决创建用户时 @BeforeInsert 不执行
      return await this.saveOne(entity);
      // const res = await this.saveOne(entity);
      // const dto = plainToInstance(
      //   UserRoleEntity,
      //   user.roles.map((item) => {
      //     return {
      //       userId: res.generatedMaps[0].userId,
      //       roleId: item,
      //     };
      //   }),
      // );
      // return await this.relationSaveOne<UserRoleEntity>(UserRoleEntity, dto);
    } else {
      return R.err('用户已存在');
    }
  }

  /**
   * 用户分页
   * @date 2022-08-18
   * @param {any} UserEntity
   * @returns {any}
   */
  async page(currentPage: number, pageSize: number, user: UserPageDto) {
    // let qb = this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user');
    // qb = qb.where(user as Partial<UserEntity>);
    // qb = qb.orderBy('created_time', 'DESC');
    // qb = qb.skip(pageSize * (pageSize - 1)).take(pageSize);
    // return await qb.getManyAndCount();

    // 或使用 .getMany() 不会返回总数

    // const result: [UserEntity[], number] = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   // .where({ ...user, delFlag: 0 })
    //   // .where('user.username LIKE :username', { username: `%${user.username}%` })
    //   // .where('user.password LIKE :password; user.username LIKE :username', {
    //   //   username: `%${user.username}%`,
    //   //   password: `%12%`,
    //   // })
    //   .where(fuzzyquery(user))
    //   // 按时间倒序
    //   .orderBy('user.createdTime', 'DESC')
    //   .skip(pageSize * (currentPage - 1))
    //   .take(pageSize)
    //   .select([
    //     'user.username',
    //     'user.state',
    //     'user.delFlag',
    //     'user.createdTime',
    //     'user.updatedTime',
    //     'user.userId',
    //   ])
    //   .getManyAndCount();
    // return R.ok('成功', { total: result[1], results: result[0] });
    const data = await this.findPage(currentPage, pageSize, user);
    return data;
  }

  /**
   * 启用/禁用
   * @date 2022-08-09
   * @param {any} {userId}:{userId:string}
   * @returns {any}
   */
  async changeState({ userId }: { userId: string }): Promise<Res> {
    // const user = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .where(`user.userId = :userId`, {
    //     userId,
    //   })
    //   .getOne();
    // const user = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .where({ userId: userId })
    //   .getOne();
    // const user = await this.findOne(`user.userId = :userId`, {
    //   userId,
    // });
    const user = await this.findOne({ userId: userId });
    if (!user) return R.err('用户不存在');
    if (user.state == 0) {
      user.state = 1;
    } else {
      user.state = 0;
    }
    const updateUser = await this.dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set(user)
      .where('userId = :userId', {
        userId,
      })
      .execute();
    if (updateUser.affected == 1) {
      return R.ok('更新成功');
    } else {
      return R.err('更新失败');
    }
  }

  /**
   * 假删除
   * @date 2022-08-09
   * @param {any} {userId}:{userId:string}
   * @returns {any}
   */
  async changeDelFlag({ userId }: { userId: string }): Promise<Res> {
    const user = await this.findOne({ userId: userId });
    if (!user) return R.err('用户不存在');
    if (user.delFlag == 0) {
      user.delFlag = 1;
    }
    // const updateUser = await this.dataSource
    //   .createQueryBuilder()
    //   .update(UserEntity)
    //   .set(user)
    //   .where('userId = :userId', {
    //     userId,
    //   })
    //   .execute();
    const updateUser = await this.update(user, { userId: userId });

    if (updateUser.affected == 1) {
      return R.ok('更新成功');
    } else {
      return R.err('更新失败');
    }
  }

  /**
   * 真删除
   * @date 2022-08-09
   * @param {any} {userId}:{userId:string}
   * @returns {any}
   */
  async delUser({ userId }: { userId: string }): Promise<Res> {
    const data = await this.delete({ userId });
    if (data.affected == 1) {
      return R.ok('删除成功');
    } else {
      return R.err('用户不存在');
    }
  }

  /**
   * 根据id查询用户
   * @date 2022-08-10
   * @param {any} {userId}:{userId:string}
   * @returns {any}
   */
  async queryUserById({ userId }: { userId: string }): Promise<Res> {
    const user = await this.dataSource
      .getRepository(this.entity)
      .createQueryBuilder(this.dataSourceStr)
      .where({ userId: userId })
      .getOne();
    if (!user) return R.err('用户不存在');

    const AllRole = await this.findMany(RoleEntity, 'role');

    const list: any = (await this.dataSource
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .innerJoin(UserRoleEntity, 'userRole', 'user.userId = userRole.userId')
      .innerJoinAndMapMany(
        'user.list',
        RoleEntity,
        'role',
        'role.roleId = userRole.roleId',
      )
      .where({ userId: userId })
      .getOne()) || { lise: [] };

    interface treeData extends RoleEntity {
      isCheck?: boolean;
    }
    _.intersectionWith(AllRole, list.list, _.isEqual).forEach(
      (item: treeData) => (item.isCheck = true),
    );

    return R.ok('成功', { ...user, roles: AllRole });
  }

  /**
   * 编辑用户
   * @date 2022-08-23
   * @param {any} users
   * @returns {any}
   */
  async editor(users: UserDto): Promise<Res> {
    const user = await this.findOne({ userId: users.userId });
    if (!user) return R.err('用户不存在');

    // 获取连接并创建新的queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 开始事务：
    await queryRunner.startTransaction();
    try {
      const updateUser = await this.update(_.pick(users, _.keys(user)), {
        userId: users.userId,
      });
      await this.relationDelete(UserRoleEntity, { userId: users.userId });
      const dto = plainToInstance(
        UserRoleEntity,
        users.roles.map((item) => {
          return {
            userId: users.userId,
            roleId: item,
          };
        }),
      );
      await this.relationSaveOne<UserRoleEntity>(UserRoleEntity, dto);
      return R.ok('成功');
    } catch (error) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      new Error('回滚' + error);
      return R.err('回滚' + error);
    } finally {
      await queryRunner.release();
    }
  }

  async uploadFile(file) {
    console.log(file);
    return R.ok('111');
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
    // const aaa = await this.dataSource.manager.save(user);
    // return aaa;

    // 使用中间表查询成功
    // const questionRepository = this.dataSource.getRepository(UserEntity);
    // const questions = await questionRepository.find({
    //   relations: ['roles'],
    // });

    // const list = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.roles', 'role')
    //   .where('user.userId = :id', {
    //     id: '76a2b794-0fdd-4fc7-b769-0e69e0fdc92c',
    //   })
    //   .getOne();
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
    // user.roles.push(role.roleId);
    const aaa = await this.dataSource.manager.save(user);
    return aaa;
  }
}
