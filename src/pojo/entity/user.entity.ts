import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Formt, FormtToString } from 'src/utils/DateFormt';
import {
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DatabaseType,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  Unique,
} from 'typeorm';
import { RoleEntity } from './role.entity';

/**
 * PrimaryGeneratedColumn 主键
 * nullable   可以为空
 * @Entity()  表示 TypeScript 类和数据库表之间的关系
 * @date 2022-06-28
 * @returns {any}
 */
@Entity({ name: 'user' })
@Unique(['id', 'username'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: '参数username要求是字符串!' })
  username: string;

  @IsNotEmpty({ message: 'password不能为空' })
  @IsString({ message: '参数password要求是字符串!' })
  @Column('varchar', { length: 20 })
  @Exclude({ toPlainOnly: true, toClassOnly: false })
  @Expose()
  password: string;

  @PrimaryGeneratedColumn('uuid')
  @Index({ unique: true })
  userId: string;

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
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      to(n) {},
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
  updatedTime: Date;

  @BeforeInsert()
  @BeforeUpdate()
  public createDate() {
    this.createdTime = Formt('yyyy-MM-dd HH:mm:ss') as unknown as Date;
  }

  @BeforeUpdate()
  updateDates() {
    this.updatedTime = Formt('yyyy-MM-dd HH:mm:ss') as unknown as Date;
  }

  // 中间实体表的配置
  // @ManyToMany((type) => RoleEntity, (role) => role.users, {
  //   nullable: true,
  //   cascade: true,
  // })
  // @JoinTable({
  //   name: 'user_role',
  //   joinColumns: [{ referencedColumnName: 'userId' }],
  //   inverseJoinColumns: [{ referencedColumnName: 'roleId' }],
  // })
  // roles: RoleEntity[];

  // 不用中间表关联
  @Column('varchar', { array: true, default: [] })
  roles: Array<string>;
}
