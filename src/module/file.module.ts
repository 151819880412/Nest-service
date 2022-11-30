import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { FileController } from 'src/controller/file.controller';
import { FileService } from 'src/service/file.service';
import { Formt } from 'src/utils/DateFormt';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./fileUpload/${Formt('yyyy-MM-dd')}`,
        filename: (req, file, cb) => {
          // 自定义文件名
          // const filename = `${randomUUID()}.${
          //   file.originalname.split('.')[
          //     file.originalname.split('.').length - 1
          //   ]
          // }`;
          const filename = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
          );
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
