import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名不为空' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly password: string;
}
