import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorLogController } from 'src/controller/error-log.controller';
import ErrorLogEntity from 'src/pojo/entity/error-log.entity';
import { ErrorLogService } from 'src/service/error.service';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorLogEntity])],
  controllers: [ErrorLogController],
  providers: [ErrorLogService],
})
export class ErrorLogModule {}
