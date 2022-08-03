import { Injectable } from '@nestjs/common';
import { PermissionEntity } from 'src/pojo/entity/permission.entity';
import { R } from 'src/response/R';
import { DataSource, getManager } from 'typeorm';
import { PermissionService } from '../permission.service';

@Injectable()
export class PermissionServiceImpl implements PermissionService {
  constructor(private readonly dataSource: DataSource) {}
  async getMenuList(UserId: string): Promise<any> {
    // const firstUser = await this.dataSource
    //   .getRepository(PermissionEntity)
    //   .createQueryBuilder('category')
    //   .getMany();
    // console.log(firstUser);

    const trees = await this.dataSource
      .getTreeRepository(PermissionEntity)
      .findTrees();
    console.log(trees);

    return trees;
  }
}
