import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from 'src/controller/login.controller';
import { UserController } from 'src/controller/user.controller';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { LoginService } from 'src/service/login.service';
import { UserService } from 'src/service/user.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule],
  controllers: [LoginController],
  providers: [LoginService],
})
export class LoginModule {}
