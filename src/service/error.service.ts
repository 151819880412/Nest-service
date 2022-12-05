import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { R, Res } from 'src/response/R';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';
import ErrorLogEntity from 'src/pojo/entity/error-log.entity';
import { ErrorLogInfo } from 'src/pojo/dto/error-log.dto';

@Injectable()
export class ErrorLogService extends BaseQueryBuilderService<ErrorLogEntity> {
  constructor(
    @InjectRepository(ErrorLogEntity)
    private readonly userRepository: Repository<ErrorLogEntity>,
    dataSource: DataSource,
  ) {
    super(dataSource, 'errorlog', ErrorLogEntity);
  }

  /**
   * 错误日志新增
   * @date 2022-12-01
   * @param {any} errorLog:ErrorLogEntity
   * @returns {any}
   */
  async add(errorLog: ErrorLogInfo): Promise<Res> {
    const data = await this.saveOne(errorLog);
    if (data.raw.length > 0) {
      return R.ok('成功');
    } else {
      return R.err('失败');
    }
  }

  /**
   * 分页
   * @date 2022-12-01
   * @param {any} currentPage:number
   * @param {any} pageSize:number
   * @param {any} obj:ErrorLogEntity
   * @returns {any}
   */
  async page(
    currentPage: number,
    pageSize: number,
    // eslint-disable-next-line @typescript-eslint/ban-types
    obj: {},
  ): Promise<Res<ErrorLogEntity>> {
    const data = await this.findPage<ErrorLogEntity>(
      currentPage,
      pageSize,
      obj,
    );
    return data;
  }
}
