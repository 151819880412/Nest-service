import { Module } from '@nestjs/common';
import { DatabaseController } from 'src/controller/database.controller';
import { DatabaseServiceImpl } from 'src/service/impl/Database.service.impl';

@Module({
  imports: [],
  controllers: [DatabaseController],
  providers: [DatabaseServiceImpl],
})
export class DatabaseModule {}
