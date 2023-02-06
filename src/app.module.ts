import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { LoginModule } from './module/login.module';
import { StatusMonitorModule } from 'nest-status-monitor';
import statusMonitorConfig from './config/statusMonitor';
import { AuthModule } from './module/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { database } from './config/database';
import { CoreModule } from './config/core';
import { UserModule } from './module/user.module';
import { RoleModule } from './module/role.module';
import { MenuModel } from './module/menu.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesEntity } from './pojo/entity/bases.entity';
import { FileModule } from './module/file.module';
import { ErrorLogModule } from './module/error-log.module';
import { DictModel } from './module/dict.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasesEntity]),
    // 登录模块
    LoginModule,
    // 用户
    UserModule,
    // 角色
    RoleModule,
    // 权限
    // 菜单
    MenuModel,
    // 文件
    FileModule,
    // 错误日志
    ErrorLogModule,
    // 系统字典
    DictModel,
    // 中间件
    CommonModule,
    // 异常监控
    StatusMonitorModule.setUp(statusMonitorConfig),
    // 权限
    AuthModule,
    // 全局配置
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    // 数据库连接
    CoreModule.forRoot(database()),
  ],
  controllers: [],
  providers: [
    // token验证
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  // 全局中间件
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(LoggerMiddleware)
  //     // 排除路径
  //     .exclude({ path: 'login', method: RequestMethod.GET })
  //     // 监听路径
  //     .forRoutes('login');
  // }
}
