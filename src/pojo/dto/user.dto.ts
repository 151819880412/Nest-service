import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '数据不为空' })
  @IsString({ message: '参数username要求是字符串!' })
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '数据不为空' })
  @IsString({ message: '参数password要求是字符串!' })
  @IsString()
  readonly password: string;
}
