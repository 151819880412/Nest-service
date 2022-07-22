import { Injectable } from '@nestjs/common';
import { LoginDto } from '../pojo/dto/login.dto';

export interface loginService {
  login(loginVO: LoginDto): number;
}

// @Injectable()
// export class loginService {
//   login(loginDto: LoginDto): number {
//     console.log(loginDto);
//     console.log(this);
//     return 111;
//   }
// }
