import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/pojo/dto/user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async validateUser(username: string, password: string): Promise<any> {
    console.log(username, password);
    const user = { name: '1', password: '1' };
    if (user && user.password) {
      const { password, ...result } = user;
      console.log(user);
      return result;
    }
    return null;
    // const user = await this.jwtService.findOneByName(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }
  async login(user: any): Promise<any> {
    const payload = { username: user.username, sub: user.sub };
    console.log(payload);
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: '24h',
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: '7 days',
      }),
    };
  }

  async register(user: UserDto): Promise<any> {
    console.log(user);
  }
}
