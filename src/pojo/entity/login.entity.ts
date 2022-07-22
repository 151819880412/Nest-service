import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * PrimaryGeneratedColumn 主键
 * nullable   可以为空
 * @Entity()  表示 TypeScript 类和数据库表之间的关系
 * @date 2022-06-28
 * @returns {any}
 */
@Entity('login')
export class LoginEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
