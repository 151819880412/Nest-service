import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { R, Res } from 'src/response/R';
interface ResponseInterFace<T> {
  data: T;
}

/**
 * 拦截器
 * @date 2022-07-18
 * @returns {any}
 */
@Injectable()
export class WarpResponseInterceptor<T extends ResponseInterFace<T>>
  implements NestInterceptor<T, ResponseInterFace<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ResponseInterFace<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    // const response = context.switchToHttp().getResponse<Response>();  response.statusCode 报错
    const response = context.switchToHttp().getResponse();
    if (response.statusCode === 201) {
      context.switchToHttp().getResponse().status(200);
    }
    return next.handle().pipe(
      map((data) => {
        // return { data, code: 20000, message: '请求成功' };
        if (data.constructor == Res) {
          return data;
        } else {
          return R.ok('请求成功', data);
        }
      }),
    );
  }
}

// @Injectable()
// export class PostInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const request = context.switchToHttp().getRequest<Request>();
//     const response = context.switchToHttp().getResponse<Response>();

//     if (request.method === 'POST') {
//        if (response.status === 201)
//           context.switchToHttp().getResponse().status(HttpStatus.OK);
//     }
//     return next.handle();
//   }
// }
