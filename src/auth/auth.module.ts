import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; 
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport'; 
import { LocalStrategy } from './local.strategy';
import { JwtMiddleware } from './jwt.middleware';
// import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy'; 
@Module({
  imports: [
    JwtModule.register({
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '600s' }, 
    }),
    UserModule, 
    PassportModule.register({ defaultStrategy: 'jwt', usernameField: 'email' }),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}

// export class AuthModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(JwtMiddleware).forRoutes('*');
//   }
// }
