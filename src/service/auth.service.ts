export interface AuthService {
  validateUser(username: string, password: string): Promise<any>;
}
