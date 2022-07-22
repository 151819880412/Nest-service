import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../auth/local.strategy';
import { AuthController } from '../controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../controller/auth.controller';
import { JwtStrategy } from '../auth/jwt.stratagy';
import { AuthServiceImpl } from 'src/service/impl/auth.service.impl';

@Module({
  imports: [
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthServiceImpl, LocalStrategy, JwtStrategy],
  exports: [AuthServiceImpl],
})
export class AuthModule {}
