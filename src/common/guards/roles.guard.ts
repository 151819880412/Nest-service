import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as request from 'supertest';
/**
 *Reflector  允许我们在特定上下文忠检索元数据
 * @date 2022-07-11
 * @returns {any}
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // console.log('是否有@IsPublic()', isPublic);
    // if (isPublic) {
    //   return true;
    // }
    // const request = context.switchToHttp().getRequest<Request>();
    // const authHeader = request.header('Authorization');
    // // return authHeader === process.env.API_KEY;
    // return authHeader === this.configService.get('API_KEY');
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log(roles, '00000');
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const { user } = request.query;
    console.log(roles, user, 111);
    return !!roles.find((role) => role === user);
  }
}
