import { UserDto } from '../pojo/dto/user.dto';
export interface AuthService {
  validateUser(username: string, password: string): Promise<any>;
  login(user: any): Promise<any>;
  register(usersDto: UserDto): Promise<any>;
}

// @Injectable()
// export class AuthService {
//   constructor(private readonly jwtService: JwtService) {}
//   async validateUser(username: string, pass: string): Promise<any> {
//     const user = { name: '1', password: '1' };
//     if (user && user.password) {
//       const { password, ...result } = user;
//       console.log(user);
//       return result;
//     }
//     return null;
//     // const user = await this.jwtService.findOneByName(username);
//     // if (user && user.password === pass) {
//     //   const { password, ...result } = user;
//     //   return result;
//     // }
//     // return null;
//   }
//   async login(user: any): Promise<any> {
//     const patload = { username: user.username, sub: user.sub };
//     console.log(patload);
//     console.log(user);
//     return {
//       access_token: this.jwtService.sign(patload),
//     };
//   }
//   // async login(user) {
//   //   return {
//   //     token: `Bearer token`,
//   //   };
//   // }
// }
