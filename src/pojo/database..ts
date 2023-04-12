import { Formt } from 'src/utils/DateFormt';
import { BaseEntity } from 'typeorm';

export class DataBase extends BaseEntity {
  // public static id = ''
  public del_flag = 0;
  public state = 0;
  public created_time = Formt('yyyy-MM-dd HH:mm:ss');
  public updated_time = Formt('yyyy-MM-dd HH:mm:ss');

  constructor(data?: any) {
    super();
    Object.assign({}, this, data);
  }
}
