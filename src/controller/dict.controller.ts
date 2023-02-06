import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import DictEntity from 'src/pojo/entity/dict.entity';
import { Res } from 'src/response/R';
import { DictServiceImpl } from 'src/service/dict.service.impl';

@ApiBearerAuth()
@ApiTags('字典')
@Controller('dict')
export class DictController {
  constructor(private readonly dictService: DictServiceImpl) {}

  @Post('page/:currentPage/:pageSize')
  queryDictListByPage(
    @Body() dictEntity: DictEntity,
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ) {
    return this.dictService.queryDictListByPage(
      currentPage,
      pageSize,
      dictEntity,
    );
  }

  @Post('addDict')
  addDict(@Body() dict: DictEntity) {
    return this.dictService.addDict(dict);
  }

  @Get('/queryDictById')
  queryDictById(@Query('dictId') dictId: string) {
    return this.dictService.queryDictById(dictId);
  }

  @Post('/queryDictByDictType')
  queryDictByDictType(@Body() dictTypeList: string[]) {
    return this.dictService.queryDictByDictType(dictTypeList);
  }

  @Post('/editorDict')
  editorDict(@Body() data: DictEntity) {
    return this.dictService.editorDict(data);
  }

  // @Post('/changeState')
  // changeState(@Body() data: { dictId: string }): Promise<Res> {
  //   return this.dictService.changeState(data);
  // }
}
