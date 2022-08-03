import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RoleService } from '../role.service';
import { RoleEntity } from '../../pojo/entity/role.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class RoleServiceImpl implements RoleService {
  constructor(private readonly dataSource: DataSource) {}
  async addRole(role: RoleEntity): Promise<any> {
    console.log(role);
    const entity = plainToInstance(RoleEntity, role); // 解决创建用户时 @BeforeInsert 不执行

    const data = await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(RoleEntity)
      .values(entity)
      .execute();
    return data;
  }
}
