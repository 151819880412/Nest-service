import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Menu from 'src/pojo/entity/menu.entity';
import RoleMenu from 'src/pojo/entity/role-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, RoleMenu])],
  controllers: [],
  providers: [],
})
export class MenuModel {}
