import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from 'src/controller/login.controller';
import { LoginEntity } from 'src/pojo/entity/login.entity';
import { loginServiceImpl } from 'src/service/impl/login.service.impl';
// import { loginService } from 'src/service/login.service';

// 初始
@Module({
  imports: [
    // 将实体同步到数据库
    TypeOrmModule.forFeature([LoginEntity]),
  ],
  controllers: [LoginController],
  providers: [loginServiceImpl],
})
export class LoginModule {}
