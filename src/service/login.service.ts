import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/pojo/entity/user.entity';
import {
  DataSource,
  EntityManager,
  getConnection,
  getManager,
  Repository,
} from 'typeorm';
import { BaseService } from './BaseService';
import { R, Res } from 'src/response/R';
import { LoginDto } from '../pojo/dto/login.dto';
import { AuthServiceImpl } from './impl/auth.service.impl';
import { UserChangePwdDto } from 'src/pojo/dto/userChangePwd.dto';
import {
  classToPlain,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from 'class-transformer';
import MenuEntity from 'src/pojo/entity/menu.entity';
import RoleMenuEntity from 'src/pojo/entity/role-menu.entity';
import { RoleEntity } from 'src/pojo/entity/role.entity';
import UserRoleEntity from 'src/pojo/entity/user-role.entity';
import { arrToTree } from 'src/utils';

@Injectable()
export class LoginService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthServiceImpl,
    private readonly dataSource: DataSource,
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

  /**
   * 登录/注册
   * @date 2022-07-27
   * @param {any} user:LoginDto
   * @returns {any}
   */
  async registerLogin(user: UserEntity): Promise<any> {
    // const users = await this.dataSource.query(
    //   `SELECT * FROM "user" WHERE username = '${user.username}'`,
    // );
    const userOne: UserEntity = await this.findOne({
      where: { username: user.username },
    });
    if (!userOne) {
      // 注册+登录
      const entity = plainToInstance(UserEntity, user); // 解决创建用户时 @BeforeInsert 不执行
      // const entity = Object.assign(new UserEntity(), user);   // 解决创建用户时 @BeforeInsert 不执行
      const regUser: UserEntity = await this.saveOne(entity);
      console.log(regUser);
      return await this.authService.getToken(regUser);
    } else {
      const data: any =
        (await this.dataSource
          .getRepository(UserEntity)
          .createQueryBuilder('user')
          .leftJoinAndSelect(
            UserRoleEntity,
            'userRole',
            'user.userId = userRole.userId',
          )
          .leftJoinAndMapMany(
            'user.roles',
            RoleEntity,
            'role',
            'role.roleId = userRole.roleId',
          )
          .where({ userId: userOne.userId })
          .leftJoinAndSelect(
            RoleMenuEntity,
            'roleMenu',
            'role.roleId = roleMenu.roleId',
          )
          .leftJoinAndMapMany(
            'user.menus',
            MenuEntity,
            'menu',
            'menu.menuId = roleMenu.menuId',
          )
          .orderBy(`menu.sort`, 'ASC')
          .andWhere('menu.type < 2')
          .getOne()) || {};

      const btn = await this.dataSource
        .getRepository(MenuEntity)
        .createQueryBuilder('menu')
        .where('menu.type >= 2 ')
        .andWhere('menu.delFlag = 0')
        .getMany();

      // const aaa = await this.dataSource
      // .getRepository(UserEntity)
      // .createQueryBuilder('user')
      // .leftJoinAndSelect(
      //   UserRoleEntity,
      //   'userRole',
      //   'user.userId = userRole.userId',
      // )
      // .where({ userId: userOne.userId })
      // .leftJoinAndMapMany(
      //   'user.roles',
      //   RoleEntity,
      //   'role',
      //   'role.roleId = userRole.roleId',
      // )
      // .leftJoinAndSelect(
      //   RoleMenuEntity,
      //   'roleMenu',
      //   'role.roleId = roleMenu.roleId',
      // )
      // .leftJoinAndMapMany(
      //   'user.menus',
      //   MenuEntity,
      //   'menu',
      //   'menu.menuId = roleMenu.menuId',
      // )
      // .where({ userId: userOne.userId })
      // .getMany();

      let menuArr = [];
      if (Array.isArray(data.menus)) {
        for (let i = 0; i < data.menus.length; i++) {
          if (data.menus[i].parentId) {
            menuArr = menuArr.concat(
              await this.dataSource
                .getTreeRepository(MenuEntity)
                .findAncestors(data.menus[i]),
            );
          }
        }
      }

      const auth = arrToTree(menuArr, { root: null }) || [];
      const roles = data.roles;
      // 登录
      const token = await this.authService.getToken(userOne);
      return {
        ...userOne,
        ...token,
        roles,
        auth,
        btn,
      };
    }
  }

  /**
   * 用户修改密码
   * @date 2022-07-27
   * @param {any} user:LoginDto
   * @returns {any}
   */
  async changePwd(user: UserChangePwdDto): Promise<Res> {
    // const userOne: Array<UserEntity> = await this.repository.query(
    //   `SELECT * FROM "user" WHERE username = '${user.username}'`,
    // );
    const userOne: UserEntity = await this.findOne({
      where: { username: user.username },
    });

    // const userOne = await this.dataSource
    //   .getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .where('user.username = :username', { username: user.username })
    //   .getOne();
    // console.log(userOne);
    // console.log(userOne);

    if (!userOne) {
      return R.err('用户不存在');
    } else {
      if (userOne.password !== user.password) {
        return R.err('当前密码错误');
      } else {
        // this.repository.update(
        //   `update user set password='${user.newPassword}' where userId='b51a013a-e284-4dc2-aac8-9851ebe3d760'`,
        //   user,
        // );
        // const res = await this.update(
        //   { ...userOne },
        //   { password: user.newPassword },
        // );
        // const res = await this.repository.update(
        //   { password: user.password },
        //   {
        //     password: user.newPassword,
        //   },
        // );

        // const entity = plainToInstance(UserEntity, user); // 解决 @BeforeInsert 不执行
        // const entity = Object.assign(new UserEntity(), user); // 解决 @BeforeInsert 不执行
        // 解决 @BeforeInsert 不执行
        const entity = plainToClass(
          UserEntity,
          { ...user, password: user.newPassword },
          {
            excludeExtraneousValues: true,
          },
        );

        const res = await this.dataSource
          .createQueryBuilder()
          .update(UserEntity)
          .set(entity)
          .where('id = :id', { id: userOne.id })
          .execute();

        return res.affected > 0 ? R.ok('更新成功') : R.err('更新失败');
      }
    }
  }
}
