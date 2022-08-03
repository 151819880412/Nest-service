export interface PermissionService {
  // validateUser(username: string, password: string): Promise<any>;
  getMenuList(UserId: string): Promise<any>;
}
