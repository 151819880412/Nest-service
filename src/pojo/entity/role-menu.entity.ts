import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role_menu' })
export default class RoleMenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'role_id' })
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  roleId: string;

  @Column({ name: 'menu_id' })
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  menuId: string;
}
