import { Controller, Post, Get, Put, Param, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataBase } from 'src/pojo/database.';
import { DatabaseDto } from 'src/pojo/dto/database.dto';
import { R, Res } from 'src/response/R';
import { DatabaseServiceImpl } from 'src/service/impl/Database.service.impl';
import { TableOptions, createConnection } from 'typeorm';

@ApiBearerAuth()
@ApiTags('数据库设置')
@Controller('databaseConfig')
export class DatabaseController {
  constructor(private readonly databaseService: DatabaseServiceImpl) {}

  @Post('create')
  async rolePage(@Body() data: DatabaseDto) {
    try {
      // 创建数据库连接
      const connection = await createConnection();
      // 实例化迁移脚本
      const migration = new DatabaseServiceImpl();
      // 创建 QueryRunner
      const queryRunner = connection.createQueryRunner();
      await queryRunner.connect();
      // 手动调用 up() 方法
      await migration.createTable(data, queryRunner);
      // 释放 QueryRunner
      await queryRunner.release();
      // 关闭数据库连接
      await connection.close();
      return R.ok('创建成功');
    } catch (err) {
      return R.err(err);
    }
  }

  @Post('addDataBase')
  async addData(@Body() data: any): Promise<Res> {
    return await this.databaseService.add('aaa', data); // 调用 addData() 方法
  }

  @Get('getData')
  async getData() {
    return this.databaseService.findById('aaa', '1');
  }

  @Put('updateData/:id')
  async updateData(
    @Param('id') id: string,
    @Body() data: Partial<DataBase>,
  ): Promise<Res> {
    return this.databaseService.update('aaa', data, { id: 1 });
  }
}
