import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'role_menu' })
export default class RoleMenu extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'role_id' })
  @ApiProperty()
  roleId: number;

  @Column({ name: 'menu_id' })
  @ApiProperty()
  menuId: number;
}
