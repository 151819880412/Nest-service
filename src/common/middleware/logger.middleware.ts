import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * 中间件
 * @date 2022-07-18
 * @returns {any}
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // console.time('start');
    console.log('中间件调用');
    const { method, path } = req;
    console.log(method, path);
    // res.on('finish', () => console.timeEnd('start'));
    next();
  }
}
