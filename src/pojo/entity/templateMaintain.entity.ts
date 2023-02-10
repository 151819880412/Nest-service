import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BasesEntity } from './bases.entity';

@Entity({ name: 'template_maintain' })
export default class TemplateMaintainEntity extends BasesEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'templateMaintain_id' })
  templateMaintainId: string;

  @Column({ nullable: true, name: 'template_maintain_name', type: 'varchar' })
  @ApiProperty()
  templateMaintainName: string;
}
