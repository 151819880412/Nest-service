import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuController } from 'src/controller/menu.controller';
import { PermissionEntity } from 'src/pojo/entity/permission.entity';
import { PermissionServiceImpl } from 'src/service/impl/permission.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  controllers: [MenuController],
  providers: [PermissionServiceImpl],
})
export class PermissionModel {}
