import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserDto } from './user.dto';
export class UserChangePwdDto extends UserDto {
  @ApiProperty({ description: '新密码' })
  @IsNotEmpty({ message: 'newPassword不能为空' })
  @IsString({ message: '参数newPassword要求是字符串!' })
  @IsString()
  readonly newPassword: string;
}
