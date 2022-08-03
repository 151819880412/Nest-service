import { Type } from 'class-transformer';
import { Formt } from 'src/utils/DateFormt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
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

  @Column('timestamp', { nullable: true, name: 'created_time' })
  @Type(() => Date)
  createdTime: Date;

  @Column('timestamp', { nullable: true, name: 'updated_time' })
  updatedTime: string;

  @BeforeInsert()
  @BeforeUpdate()
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

  // 不用中间表关联
  @Column('varchar', { nullable: true, array: true })
  users: Array<string>;

  // 无中间实体表的配置
  // @ManyToMany((type) => PermissionEntity, (perm) => perm.roles)
  // @JoinTable({
  //   name: 'role_perm',
  //   joinColumns: [{ name: 'role_id' }],
  //   inverseJoinColumns: [{ name: 'perm_id' }],
  // })
  // perms: PermissionEntity[];

  // @ManyToMany(() => UserEntity, (category) => category.questions)
  // @JoinTable()
  // categories: UserEntity[];
}
