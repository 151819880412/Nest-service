import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Formt } from 'src/utils/DateFormt';
import { Request, Response } from 'express';
import { R } from 'src/response/R';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    // const status =
    //   exception instanceof HttpException
    //     ? exception.getStatus()
    //     : HttpStatus.INTERNAL_SERVER_ERROR;
    const status = exception.getStatus();

    const badMessage = exception.message;

    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse;
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message;
    }

    if (badMessage == 'Unauthorized') {
      response.status(200).json(R.err('请重新登录', 30001));
    } else {
      response.status(status).json({
        code: status,
        timestamp: Formt('yyyy-MM-dd HH:mm:ss'),
        path: request.url,
        message: validatorMessage || badMessage,
        type: 'error',
      });
    }
  }
}
