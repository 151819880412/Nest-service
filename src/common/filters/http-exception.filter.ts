import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Formt } from 'src/utils/DateFormt';
import { Request, Response } from 'express';
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const badMessage = exception.message;

    const exceptionResponse: any = exception.getResponse();
    let validatorMessage = exceptionResponse;
    if (typeof validatorMessage === 'object') {
      validatorMessage = exceptionResponse.message;
    }

    response.status(status).json({
      code: status,
      timestamp: Formt('yyyy-MM-dd HH:mm:ss'),
      path: request.url,
      message: validatorMessage || badMessage,
      type: 'error',
    });
  }
}
