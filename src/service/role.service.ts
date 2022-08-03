import { RoleEntity } from '../pojo/entity/role.entity';
export interface RoleService {
  addRole(role: RoleEntity): Promise<any>;
}
