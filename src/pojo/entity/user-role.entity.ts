import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'user_role' })
export default class UserRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'user_id' })
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  userId: string;

  @Column({ name: 'role_id' })
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  roleId: string;
}
