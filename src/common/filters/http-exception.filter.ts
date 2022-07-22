// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   HttpStatus,
//   Logger,
// } from '@nestjs/common';

// /**
//  * http 异常处理
//  * @date 2022-07-18
//  * @param {any} HttpException
//  * @returns {any}
//  */
// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse();
//     const request = ctx.getRequest();
//     const status =
//       exception instanceof HttpException
//         ? exception.getStatus()
//         : HttpStatus.INTERNAL_SERVER_ERROR;
//     const exceptionRes: any = exception.getResponse();
//     const { error, message } = exceptionRes;
//     console.log(11111);
//     // response.status(status).json({
//     //   status,
//     //   timestamp: new Date().toISOString(),
//     //   path: request.url,
//     //   error,
//     //   message,
//     //   a: 1,
//     // });

//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       aaa: 1,
//     });

//     // const message = exception.message;
//     // Logger.log('错误提示', message);
//     // const errorResponse = {
//     //   data: {
//     //     error: message,
//     //   }, // 获取全部的错误信息
//     //   message: '请求失败',
//     //   code: 1, // 自定义code
//     //   url: request.originalUrl, // 错误的url地址
//     // };
//     // const status =
//     //   exception instanceof HttpException
//     //     ? exception.getStatus()
//     //     : HttpStatus.INTERNAL_SERVER_ERROR;
//     // // 设置返回的状态码、请求头、发送错误信息
//     // response.status(status);
//     // response.header('Content-Type', 'application/json; charset=utf-8');
//     // // response.send(errorResponse);
//     // response.send(exception.getResponse());
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Formt } from 'src/utils/DateFormt';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception.message;

    response.status(status).json({
      code: status,
      timestamp: Formt('yyyy-MM-dd HH:mm:ss'),
      path: request.url,
      message,
      type: 'error',
    });
  }
}
