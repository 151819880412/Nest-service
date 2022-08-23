import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BaseEntity,
  TreeParent,
  TreeChildren,
  Tree,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'menu' })
// @Tree('nested-set')
export default class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @PrimaryGeneratedColumn('uuid', { name: 'menu_id' })
  menuId: string;

  @Column({ name: 'parent_id', nullable: true })
  @ApiProperty()
  parentId: number;

  @Column()
  @ApiProperty()
  menuName: string;

  @Column({ nullable: true })
  @ApiProperty()
  path: string;

  @Column({ name: 'btn_name', nullable: true })
  @ApiProperty()
  btnName: string;

  @Column({ default: 0 })
  @ApiProperty()
  type: number;

  @Column({ nullable: true })
  @ApiProperty()
  icon: string;

  @Column({ type: 'int', default: 0, nullable: true })
  sort: number;

  @Column({ default: 0, name: 'del_flag' })
  delFlag: number;

  // @TreeChildren()
  // children: MenuEntity[];

  // @TreeParent()
  // parent: MenuEntity;
}
