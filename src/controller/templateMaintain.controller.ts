import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ValidationPipes } from 'src/pipes/validationPipes.pipe';
import { TemplateMaintainDto } from 'src/pojo/dto/templateMaintain.dto';
import TtemplateMaintainEntity from 'src/pojo/entity/templateMaintain.entity';
import { TemplateMaintainServiceImpl } from 'src/service/templateMaintain.service.impl';

@ApiBearerAuth()
@ApiTags('模板维护')
@Controller('templateMaintain')
export class TemplateMaintainController {
  constructor(
    private readonly templateMaintainService: TemplateMaintainServiceImpl,
  ) {}

  @Post('page/:currentPage/:pageSize')
  queryTemListByPage(
    @Body() data: TtemplateMaintainEntity,
    @Param('currentPage') currentPage: number,
    @Param('pageSize') pageSize: number,
  ) {
    return this.templateMaintainService.queryTemListByPage(
      currentPage,
      pageSize,
      data,
    );
  }

  @Post('addTemplate')
  addTemplate(@Body() data: TtemplateMaintainEntity) {
    return this.templateMaintainService.addTemplate(data);
  }

  @Get('/queryTemplateById')
  queryTemplateById(@Query('templateMaintainId') id: string) {
    return this.templateMaintainService.queryTemplateById(id);
  }

  @Post('/editorTemplate')
  // @UsePipes(new ValidationPipes())
  editorTemplate(@Body() data: TemplateMaintainDto) {
    return this.templateMaintainService.editorTemplate(data);
  }

  @Post('/delTemplate')
  delTemplate(@Body() data: TtemplateMaintainEntity) {
    return this.templateMaintainService.delTemplate(data);
  }
}
