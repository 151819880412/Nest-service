import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  providers: [],
})
/**
 * 局部中间件
 * @date 2022-07-13
 * @param {any} consumer:MiddlewareConsumer
 * @returns {any}
 */
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // 排除路径
      .exclude({ path: 'login', method: RequestMethod.GET })
      // 监听路径
      .forRoutes('login');
  }
}
