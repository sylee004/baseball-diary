import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth.service';
import { NaverAuthService } from './naver-auth.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('jwt.secret'),
          signOptions: { expiresIn: '100s' },
        };
      },
    }),
    HttpModule,
    UserModule,
  ],
  providers: [AuthService, GoogleAuthService, NaverAuthService],
  exports: [AuthService, GoogleAuthService, NaverAuthService],
  controllers: [AuthController],
})
export class AuthModule {}
