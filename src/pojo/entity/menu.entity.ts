import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  TreeParent,
  TreeChildren,
  Tree,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BasesEntity } from './bases.entity';

@Entity({ name: 'menu' })
// @Tree('nested-set')
// @Tree('closure-table')
@Tree('materialized-path')
export default class MenuEntity extends BasesEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'menu_id' })
  menuId: string;

  @Column({ name: 'parent_id', nullable: true })
  @ApiProperty()
  parentId: number;

  @Column()
  @ApiProperty()
  menuName: string;

  @Column()
  @ApiProperty({ name: 'component_name', nullable: true })
  componentName: string;

  @Column({ nullable: true })
  @ApiProperty()
  path: string;

  @Column({ nullable: true })
  @ApiProperty()
  componentPath: string;

  @Column({ name: 'btn_name', nullable: true })
  @ApiProperty()
  btnName: string;

  @Column({ default: 0, comment: '类型，0：菜单，1：路由，2：按钮' })
  @ApiProperty()
  type: number;

  @Column({ nullable: true })
  @ApiProperty()
  icon: string;

  @Column({ type: 'int', default: 0, nullable: true })
  sort: number;

  @Column({ default: 1, name: 'del_flag' })
  delFlag: number;

  @TreeChildren()
  children: MenuEntity[];

  // 启用级联删除
  @TreeParent({ onDelete: 'CASCADE' })
  parent: MenuEntity;

  // constructor(data) {
  //   super();
  //   Object.assign(this, data);
  // }
}
