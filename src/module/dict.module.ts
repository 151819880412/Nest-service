import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictController } from 'src/controller/dict.controller';
import DictEntity from 'src/pojo/entity/dict.entity';
import { DictServiceImpl } from 'src/service/dict.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([DictEntity])],
  controllers: [DictController],
  providers: [DictServiceImpl],
})
export class DictModel {}
