export class RolePageDto {
  readonly rolename: string;
  readonly state: number;
}

export class RoleEditorDto {
  rolename: string;
  roleId: string;
  menus: Array<string>;
}
