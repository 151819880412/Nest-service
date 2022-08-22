import { Type } from 'class-transformer';
import { Formt, FormtToString } from 'src/utils/DateFormt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

/**
 * PrimaryGeneratedColumn 主键
 * nullable   可以为空
 * @Entity()  表示 TypeScript 类和数据库表之间的关系
 * @date 2022-06-28
 * @returns {any}
 */
@Entity({ name: 'role' })
@Unique(['id'])
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryGeneratedColumn('uuid', { name: 'role_id' })
  @Index({ unique: true })
  roleId: string;

  @Column('varchar', { name: 'role_name', length: 20 })
  @Index({ unique: true })
  roleName: string;

  // 0 启用 1 禁用
  @Column('int', { default: 0 })
  state: number;

  // 0 删除 1 未删除
  @Column('int', { default: 0, name: 'del_flag' })
  delFlag: number;

  @Column({
    nullable: true,
    name: 'created_time',
    transformer: {
      to(n) {
        return n;
      },
      from(n) {
        if (n instanceof Date) {
          return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
        }
        return n;
      },
    },
  })
  createdTime: Date;

  @Column({
    nullable: true,
    name: 'updated_time',
    transformer: {
      to(n) {
        return n;
      },
      from(n) {
        if (n instanceof Date) {
          return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
        }
        return n;
      },
    },
  })
  updatedTime: string;

  @BeforeInsert()
  public createDate() {
    this.createdTime = Formt('yyyy-MM-dd HH:mm:ss') as unknown as Date;
  }

  @BeforeUpdate()
  updateDates() {
    console.log(222);
    this.updatedTime = Formt('yyyy-MM-dd HH:mm:ss');
  }

  // 中间实体表的配置
  // @ManyToMany((type) => UserEntity, (user) => user.roles, {
  //   nullable: true,
  // })
  // users: UserEntity[];

  // // 不用中间表关联
  // @Column('varchar', { nullable: true, array: true })
  // users: Array<string>;

  // // 无中间实体表的配置
  // @ManyToMany((type) => PermissionEntity, (perm) => perm.roles)
  // @JoinTable({
  //   name: 'role_perm',
  //   // joinColumns: [{ name: 'role_id' }],
  //   // inverseJoinColumns: [{ name: 'perm_id' }],
  // })
  // perms: PermissionEntity[];
}
