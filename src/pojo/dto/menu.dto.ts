import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuItemsDto {
  @ApiProperty({ description: '名称', type: String })
  @IsNotEmpty({ message: 'menuName不能为空' })
  @IsString({ message: '参数menuName要求是字符串!' })
  readonly menuName: string;

  @ApiProperty({ description: '路由地址', type: String })
  // @IsNotEmpty({ message: 'routerPath不能为空' })
  // @IsString({ message: '参数routerPath要求是字符串!' })
  readonly path: string;

  @ApiProperty({ description: '组件路径', type: String })
  // @IsNotEmpty({ message: 'componentPath不能为空' })
  // @IsString({ message: '参数componentPath要求是字符串!' })
  readonly componentPath: string;

  @ApiProperty({ description: '名称', type: Number })
  @IsNotEmpty({ message: 'sort不能为空' })
  @IsNumber({}, { message: '参数path要求是数字' })
  readonly sort: number;

  @ApiProperty({ description: '是否显示', type: Number })
  @IsNotEmpty({ message: 'delFlag不能为空' })
  @IsNumber({}, { message: '参数delFlag要求是数字' })
  readonly delFlag: number;

  readonly menuId: string;
}
