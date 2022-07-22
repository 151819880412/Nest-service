import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/pojo/dto/login.dto';
import { loginService } from '../login.service';

@Injectable()
export class loginServiceImpl implements loginService {
  login(loginDto: LoginDto): number {
    console.log(loginDto);
    return 1;
  }
}
