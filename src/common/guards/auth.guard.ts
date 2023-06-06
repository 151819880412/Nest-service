import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RedisInstance } from 'src/database/redis';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UserEntity } from '../../pojo/entity/user.entity';
import { R } from 'src/response/R';

/**
 * 守卫
 * @date 2022-07-18
 * @returns {any}
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();

    // 获取请求头里的 token
    const token: string = request['headers'].authorization as string;

    if (token) {
      try {
        // 获取 redis 里缓存的 token
        const user: UserEntity = new JwtService().decode(token) as UserEntity;
        const key = `${user.userId}-${user.username}`;
        const redis_token = await RedisInstance.getRedis(
          'auth.certificate',
          0,
          key,
        );
        if (!redis_token || redis_token !== token) {
          throw new UnauthorizedException('Unauthorized');
        }
      } catch (err) {
        throw new UnauthorizedException('Unauthorized');
      }

      return true;
    }
    throw new UnauthorizedException('Unauthorized');
  }
}
