import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' }); // 15분 유효 기간의 액세스 토큰
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' }); // 7일 유효 기간의 리프레시 토큰

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // 리프레시 토큰 검증 및 새로운 액세스 토큰 발급
  async refresh(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findByUsername(decoded.username);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return this.login(user); // 새로운 액세스 토큰 및 리프레시 토큰 발급
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
