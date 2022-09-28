import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from 'src/controller/menu.controller';
import Menu from 'src/pojo/entity/menu.entity';
import RoleMenuEntity from 'src/pojo/entity/role-menu.entity';
import { MenuServiceImpl } from 'src/service/menu.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, RoleMenuEntity])],
  controllers: [MenuController],
  providers: [MenuServiceImpl],
})
export class MenuModel {}
