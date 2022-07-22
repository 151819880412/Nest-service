/**
 * 用来储存装饰器
 */

import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const Roles = (...roles: string[]) => {
  console.log('roles' + roles);
  return SetMetadata('roles', roles);
};
