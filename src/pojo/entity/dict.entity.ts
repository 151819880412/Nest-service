import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BasesEntity } from './bases.entity';

@Entity({ name: 'dict' })
export default class DictEntity extends BasesEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'dict_id' })
  dictId: string;

  @Column({ nullable: true, name: 'cn_name', type: 'varchar' })
  @ApiProperty()
  cnName: string;

  @Column({ nullable: true, name: 'en_name', type: 'varchar' })
  @ApiProperty()
  enName: string;

  @Column({ nullable: true, name: 'system_dict', type: 'int4' })
  @ApiProperty()
  systemDict: number;

  @Column({ nullable: true, name: 'dict_type', type: 'varchar' })
  @ApiProperty()
  dictType: string;

  @Column({ nullable: true, name: 'dict_value', type: 'int4' })
  @ApiProperty()
  dictValue: number;
}
