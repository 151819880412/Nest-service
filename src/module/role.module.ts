import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from 'src/controller/role.controller';
import { RoleEntity } from 'src/pojo/entity/role.entity';
import { RoleServiceImpl } from 'src/service/impl/role.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleServiceImpl],
})
export class RoleModule {}
