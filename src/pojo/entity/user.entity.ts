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
  username: string;

  @Column('varchar', { length: 20 })
  password: string;

  @PrimaryGeneratedColumn('uuid')
  userId: string;

  // @Column()
  // status: boolean;
  // @OneToMany(() => PhotoEntity, (photo) => photo.user)
  // photos: [];
}
