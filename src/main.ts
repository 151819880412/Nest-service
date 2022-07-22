import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WarpResponseInterceptor } from './common/interceptors/warp-response.interceptor';
import { RolesGuard } from './common/guards/roles.guard';
// import './utils/time';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局注册参数过滤器
  app.useGlobalPipes(
    new ValidationPipe({
      // 设置白名单
      whitelist: true,
      // 任何非白名单属性都会报错
      forbidNonWhitelisted: true,
      //  将传入的数据格式转换为我们定义的类型(比如get请求占位符id是number但是经过网络传输会自动转为string)
      transform: true,
      transformOptions: {
        // 隐式类型转换   会将 requestBody 中的 string 隐式转换为 number
        // enableImplicitConversion: true,
      },
    }),
  );
  // 全局注册响应拦截器
  app.useGlobalInterceptors(new WarpResponseInterceptor());
  // 全局注册错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局守卫
  // app.useGlobalGuards(new RolesGuard());

  // swagger
  const options = new DocumentBuilder()
    .setTitle('标题')
    .setDescription('Coffee application')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // 挂载
  SwaggerModule.setup('api', app, document);
  await app.listen(8087);
}
bootstrap();

/**
 * 全局异常
 * @date 2022-07-012
 * @param {any} 'unhandledRejection'
 * @param {any} (reason
 * @param {any} promise
 * @returns {any}
 */
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at: Promise', promise, 'reason:', reason);
});
