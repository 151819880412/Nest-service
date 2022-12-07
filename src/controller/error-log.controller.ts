import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import ErrorLogEntity from 'src/pojo/entity/error-log.entity';
import { ErrorLogService } from 'src/service/error.service';
import { Res } from 'src/response/R';
import { ErrorLogInfo } from 'src/pojo/dto/error-log.dto';

@ApiBearerAuth()
@ApiTags('错误日志')
@Controller('errorLog')
export class ErrorLogController {
  constructor(private readonly errorLogService: ErrorLogService) {}

  /**
   * 新增错误日志
   * @date 2022-12-01
   * @param {any} 'add'
   * @returns {any}
   */
  @Post('add')
  add(@Body() errorLog: ErrorLogInfo): Promise<Res> {
    return this.errorLogService.add(errorLog);
  }

  /**
   * 分页
   * @date 2022-12-01
   * @returns {any}
   */
  @Post('page/:currentPage/:pageSize')
  page(
    // eslint-disable-next-line @typescript-eslint/ban-types
    @Body() data: {},
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ): Promise<Res<ErrorLogEntity>> {
    return this.errorLogService.page(currentPage, pageSize, data);
  }

  /**
   * 根据id查询
   * @date 2022-12-05
   * @param {any} '/queryById'
   * @returns {any}
   */
  @Post('/queryById')
  queryRoleById(@Body() data: { errorLogId: string }): Promise<ErrorLogEntity> {
    return this.errorLogService.queryById(data.errorLogId);
  }
}
