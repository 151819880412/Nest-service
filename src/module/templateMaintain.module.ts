import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateMaintainController } from 'src/controller/templateMaintain.controller';
import TemplateMaintainEntity from 'src/pojo/entity/templateMaintain.entity';
import { TemplateMaintainServiceImpl } from 'src/service/templateMaintain.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateMaintainEntity])],
  controllers: [TemplateMaintainController],
  providers: [TemplateMaintainServiceImpl],
})
export class TemplateMaintainModule {}
