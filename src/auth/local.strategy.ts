import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceImpl } from 'src/service/impl/auth.service.impl';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthServiceImpl) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('username--' + username, 'password--' + password);

    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
