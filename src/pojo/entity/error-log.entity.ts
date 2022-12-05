import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BasesEntity } from './bases.entity';

export enum ErrorTypeEnum {
  VUE = 'vue',
  SCRIPT = 'script',
  RESOURCE = 'resource',
  AJAX = 'ajax',
  PROMISE = 'promise',
}

@Entity({ name: 'error_log' })
export default class ErrorLogEntity extends BasesEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'error_log_id' })
  @ApiProperty({ description: '错误日志id', type: String })
  errorLogId: string;

  @Column()
  @ApiProperty({
    description: '类型',
    type: String,
    enum: ['vue', 'script', 'resource', 'ajax', 'promise'],
  })
  type: ErrorTypeEnum;

  @Column()
  @ApiProperty()
  file: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  name: string;

  @Column()
  @ApiProperty()
  message: string;

  @Column({ nullable: true })
  @ApiProperty()
  stack: string;

  @Column()
  @ApiProperty()
  detail: string;

  @Column()
  @ApiProperty()
  url: string;

  @Column({ nullable: true })
  @ApiProperty()
  time: string;
}
