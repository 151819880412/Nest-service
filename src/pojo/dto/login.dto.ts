import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ description: '用户名', type: String })
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: '参数username要求是字符串!' })
  readonly username: string;

  @ApiProperty({ description: '密码', type: String })
  @IsNotEmpty({ message: 'username不能为空' })
  @IsString({ message: '参数username要求是字符串!' })
  readonly password: string;
}
