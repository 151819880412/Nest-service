import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import TtemplateMaintainEntity from 'src/pojo/entity/templateMaintain.entity';
import { TemplateMaintainServiceImpl } from 'src/service/templateMaintain.service.impl';

@ApiBearerAuth()
@ApiTags('模板维护')
@Controller('templateMaintain')
export class TemplateMaintainController {
  constructor(private readonly dictService: TemplateMaintainServiceImpl) {}

  @Post('page/:currentPage/:pageSize')
  queryTemListByPage(
    @Body() data: TtemplateMaintainEntity,
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ) {
    return this.dictService.queryTemListByPage(currentPage, pageSize, data);
  }

  @Post('addTemplate')
  addTemplate(@Body() data: TtemplateMaintainEntity) {
    return this.dictService.addTemplate(data);
  }

  @Get('/queryTemplateById')
  queryTemplateById(@Query('dictId') id: string) {
    return this.dictService.queryTemplateById(id);
  }

  @Post('/editorTemplate')
  editorTemplate(@Body() data: TtemplateMaintainEntity) {
    return this.dictService.editorTemplate(data);
  }
}
