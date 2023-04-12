// import {
//   ExceptionFilter,
//   Catch,
//   ArgumentsHost,
//   HttpException,
// } from '@nestjs/common';
// import { Formt } from 'src/utils/DateFormt';
// import { Request, Response } from 'express';
// import { R } from 'src/response/R';
// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     // const response = ctx.getResponse();
//     const request = ctx.getRequest<Request>();
//     // const status =
//     //   exception instanceof HttpException
//     //     ? exception.getStatus()
//     //     : HttpStatus.INTERNAL_SERVER_ERROR;
//     console.log(exception);
//     console.log(exception.message);
//     const badMessage = exception.message;
//     let validatorMessage;
//     let status = 200;
//     if (exception.getStatus) {
//       status = exception.getStatus() || 200;
//     }
//     if (exception.getResponse) {
//       const exceptionResponse: any = exception.getResponse();
//       validatorMessage = exceptionResponse;
//       if (typeof validatorMessage === 'object') {
//         validatorMessage = exceptionResponse.message;
//       }
//     }

//     if (badMessage == 'Unauthorized') {
//       response.status(200).json(R.err('请重新登录', 30001));
//     } else if (exception.message === 'Bad Request Exception') {
//       response.status(status).json({
//         code: 40000,
//         timestamp: Formt('yyyy-MM-dd HH:mm:ss'),
//         path: request.url,
//         message: validatorMessage || badMessage,
//         type: 'error',
//       });
//     } else {
//       console.log(exception, 11111);
//       response.status(status).json({
//         code: 50000,
//         timestamp: Formt('yyyy-MM-dd HH:mm:ss'),
//         path: request.url,
//         message: validatorMessage || badMessage,
//         type: 'error',
//       });
//     }
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
import { Request, Response } from 'express';
import { R } from 'src/response/R';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log(exception, 111);
    // const status = exception.getStatus
    //   ? exception.getStatus()
    //   : HttpStatus.INTERNAL_SERVER_ERROR;
    const status =
      exception instanceof HttpException
        ? exception.getStatus && exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = exception.getResponse
      ? exception.getResponse()
      : exception.message || 'Internal Server Error';
    if (typeof message === 'object') {
      message = message.message;
    }
    const code = getErrorCode(exception);

    if (code === 30001) {
      response.status(200).json(R.err('请重新登录', code));
    } else {
      response.status(status).json({
        code,
        message,
        timestamp: Formt('yyyy-MM-dd HH:mm:ss'),
        path: request.url,
        type: 'error',
      });
    }
    // 记录日志
    // logError(exception, request, message);
  }
}

function getErrorCode(exception: HttpException): number {
  const status =
    exception instanceof HttpException
      ? exception.getStatus && exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  if (status === HttpStatus.UNAUTHORIZED) {
    return 30001;
  }
  if (status === HttpStatus.BAD_REQUEST) {
    return 40001;
  }
  if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
    return 50001;
  }
  return 40000;
}

// function logError(
//   exception: HttpException,
//   request: Request,
//   message: any,
// ): void {
//   const error = {
//     message,
//     stack: exception.stack,
//     params: request.params,
//     query: request.query,
//     body: request.body,
//   };
//   console.error(JSON.stringify(error, null, 2));
// }
