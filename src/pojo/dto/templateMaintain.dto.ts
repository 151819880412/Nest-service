import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TemplateMaintainDto {
  @ApiProperty({ description: '模板id', type: String })
  @IsNotEmpty({ message: 'templateMaintainId 不能为空' })
  @IsString({ message: '参数 templateMaintainId 要求是字符串!' })
  readonly templateMaintainId: string;

  @ApiProperty({ description: '模板名称', type: String })
  @IsNotEmpty({ message: 'templateMaintainName 不能为空' })
  @IsString({ message: '参数 templateMaintainName 要求是字符串!' })
  readonly templateMaintainName: string;
}
