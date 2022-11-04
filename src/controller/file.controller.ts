import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFloatPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Res } from 'src/response/R';
import { FileService } from 'src/service/file.service';
import multer = require('multer');
@ApiBearerAuth()
@ApiTags('文件')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * 上传文件
   * @date 2022-10-14
   * @param {any} FileInterceptor('file'
   * @returns {any}
   */
  @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Res> {
    console.log(file, 111);
    return this.fileService.uploadFile(file);
  }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('upload')
  // uploadFileAndPassValidation(
  //   @Body() body,
  //   @UploadedFile(new ParseFloatPipe().transform('jpg', { data: file }))
  //   file?: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file,
  //   };
  // }
}
