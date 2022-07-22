import { HttpException } from '@nestjs/common';

export class Exception extends HttpException {
  constructor(errcode: number, errmsg: string, statusCode: number) {
    super({ errcode, errmsg }, statusCode);
  }
}
