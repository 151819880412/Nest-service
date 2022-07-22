import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class UserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly password: string;
}
