import { PrimaryGeneratedColumn, Column, Entity, BaseEntity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'menu' })
export default class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ name: 'parent_id', nullable: true })
  @ApiProperty()
  parentId: number;

  @Column()
  @ApiProperty()
  name: string;

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
}
