import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Formt, FormtToString } from 'src/utils/DateFormt';

export abstract class BasesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  // 0 未删除 1 删除
  @Column('int', { default: 0, name: 'del_flag' })
  delFlag: number;

  // @Column({
  //   nullable: true,
  //   name: 'created_time',
  //   transformer: {
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     to(n) {
  //       return n;
  //     },
  //     from(n) {
  //       if (n instanceof Date) {
  //         return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
  //       }
  //       return n;
  //     },
  //   },
  // })
  // createdTime: Date;

  // @Column({
  //   nullable: true,
  //   name: 'updated_time',
  //   transformer: {
  //     to(n) {
  //       return n;
  //     },
  //     from(n) {
  //       if (n instanceof Date) {
  //         return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
  //       }
  //       return n;
  //     },
  //   },
  // })
  // updatedTime: Date;

  // @BeforeInsert()
  // public createDate() {
  //   this.createdTime = Formt('yyyy-MM-dd HH:mm:ss') as unknown as Date;
  // }

  // @BeforeUpdate()
  // updateDates() {
  //   this.updatedTime = Formt('yyyy-MM-dd HH:mm:ss') as unknown as Date;
  // }

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '创建时间',
    name: 'created_time',
    transformer: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      to(n) {
        if (!n) {
          return Formt('yyyy-MM-dd HH:mm:ss');
        }
        if (n instanceof Date) {
          return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
        }
        return n;
      },
      from(n) {
        if (n instanceof Date) {
          return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
        }
        return n;
      },
    },
  })
  @ApiProperty()
  createdTime: Date;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    comment: '更新时间',
    name: 'updated_time',
    transformer: {
      to(n) {
        if (!n) {
          return Formt('yyyy-MM-dd HH:mm:ss');
        }
        if (n instanceof Date) {
          return FormtToString(n, 'yyyy-MM-dd HH:mm:ss');
        }
        return n;
      },
      from(n) {
        if (n instanceof Date) {
          return Formt('yyyy-MM-dd HH:mm:ss');
        }
        return n;
      },
    },
  })
  @ApiProperty()
  updatedTime: Date;
}
