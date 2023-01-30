import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ description: '用户名', type: String })
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: '参数username要求是字符串!' })
  readonly username: string;

  @ApiProperty({ description: '手机号', type: String })
  @IsNotEmpty({ message: 'phone不能为空' })
  @IsString({ message: '参数phone要求是字符串!' })
  readonly phone: string;

  @ApiProperty({ description: '密码', type: String })
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: '参数username要求是字符串!' })
  readonly password: string;

  @ApiProperty({ description: '用户类型', type: String })
  @IsNotEmpty({ message: 'type不能为空' })
  @IsString({ message: '参数type要求是字符串!' })
  readonly type: string;
}
