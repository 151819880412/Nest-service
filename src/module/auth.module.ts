import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../controller/auth.controller';
import { AuthServiceImpl } from 'src/service/impl/auth.service.impl';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
