import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  Tree,
  TreeChildren,
  TreeParent,
  ManyToMany,
} from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity({ name: 'permission' })
@Tree('materialized-path')
export class PermissionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  name: string;

  @Column()
  type: number;

  @Column({ nullable: true, name: 'btn_name' })
  btnName: string;

  @Column({ default: false, name: 'del_flag' })
  delFlag: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column()
  sort: number;

  @TreeChildren()
  children: PermissionEntity[];

  @TreeParent()
  parent: PermissionEntity;

  // @ManyToMany((type) => RoleEntity, (role) => role.perms, { cascade: true })
  // roles: RoleEntity[];
}
