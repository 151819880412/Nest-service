import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/pojo/entity/user.entity';
import { DataSource } from 'typeorm';
import { BaseQueryBuilderService } from './BaseQueryBuilder.service';
import { R } from 'src/response/R';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService extends BaseQueryBuilderService<UserEntity> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  async uploadFile(file) {
    // console.log(file);
    // const fileNmae = file.name;
    // const fileBuffer = file.file[0]?.buffer;
    // const writeImage = createWriteStream(
    //   join(__dirname, '../../../public', `${fileNmae}`),
    // );
    // writeImage.write(fileBuffer);
    return R.ok('111');
  }
}
