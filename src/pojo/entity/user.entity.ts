import { IsNotEmpty, IsString } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * PrimaryGeneratedColumn 主键
 * nullable   可以为空
 * @Entity()  表示 TypeScript 类和数据库表之间的关系
 * @date 2022-06-28
 * @returns {any}
 */
@Entity({ name: 'user' })
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
  password: string;

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  // @Column()
  // status: boolean;
  // @OneToMany(() => PhotoEntity, (photo) => photo.user)
  // photos: [];
}
