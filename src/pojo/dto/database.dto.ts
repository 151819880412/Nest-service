import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TableColumnOptions, TableIndexOptions } from 'typeorm';

export class DatabaseDto {
  @ApiProperty({ description: '名称', type: String })
  @IsNotEmpty({ message: 'tableName 不能为空' })
  @IsString({ message: '参数 tableName 要求是字符串!' })
  readonly tableName: string;

  @ApiProperty({ description: '名称', type: String })
  @IsNotEmpty({ message: 'name 不能为空' })
  @IsString({ message: '参数 name 要求是字符串!' })
  readonly name: string;

  @ApiProperty({ description: '列', type: String })
  readonly columns: TableColumnOptions[];

  @ApiProperty({ description: '主键', type: String })
  readonly isPrimary: string;

  @ApiProperty({ description: '索引', type: String })
  readonly isUnique: string[];

  @ApiProperty({ description: '索引', type: String })
  indices?: TableIndexOptions[];
}
