import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuItemsDto {
  @ApiProperty({ description: '名称', type: String })
  @IsNotEmpty({ message: 'menuName不能为空' })
  @IsString({ message: '参数menuName要求是字符串!' })
  readonly menuName: string;

  @ApiProperty({ description: '路径', type: String })
  @IsNotEmpty({ message: 'path不能为空' })
  @IsString({ message: '参数path要求是字符串!' })
  readonly path: string;

  @ApiProperty({ description: '名称', type: Number })
  @IsNotEmpty({ message: 'sort不能为空' })
  @IsNumber({}, { message: '参数path要求是数字' })
  readonly sort: number;

  @ApiProperty({ description: '是否显示', type: Number })
  @IsNotEmpty({ message: 'delFlag不能为空' })
  @IsNumber({}, { message: '1参数path要求是数字' })
  readonly delFlag: number;

  readonly menuId: string;
}
