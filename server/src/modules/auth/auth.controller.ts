import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth.service';
import { NaverAuthService } from './naver-auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private googleAuthService: GoogleAuthService,
    private naverAuthService: NaverAuthService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    description: '유저 이름과 비밀번호로 로그인합니다.',
  })
  @ApiBody({ description: '로그인 정보', type: Object })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @ApiResponse({ status: 401, description: '로그인 실패' })
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOperation({
    summary: '리프레시 토큰 API',
    description: '리프레시 토큰을 사용해 새로운 액세스 토큰을 발급합니다.',
  })
  @ApiBody({ description: '리프레시 토큰', type: Object })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('verify-token')
  @ApiBearerAuth('access-token') // JWT 토큰을 위한 설정 추가
  @ApiOperation({
    summary: 'JWT 토큰 검증 API',
    description: 'JWT 토큰을 검증합니다.',
  })
  @ApiBody({ description: 'JWT 토큰 정보', type: Object })
  async verifyToken(@Body() body: { token: string }) {
    return this.authService.verifyToken(body.token);
  }

  @Post('google')
  @ApiOperation({
    summary: 'Google OAuth 로그인 API',
    description: 'Google OAuth 토큰을 검증합니다.',
  })
  @ApiBody({ description: 'Google OAuth 토큰', type: Object })
  async googleLogin(@Body('token') token: string) {
    const user = await this.googleAuthService.validateGoogleToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid Google credentials');
    }
    return { message: 'Google login successful', user };
  }

  @Post('naver')
  @ApiOperation({
    summary: 'Naver OAuth 로그인 API',
    description: 'Naver OAuth 토큰을 검증합니다.',
  })
  @ApiBody({ description: 'Naver OAuth 토큰', type: Object })
  async naverLogin(@Body('token') token: string) {
    const user = await this.naverAuthService.validateNaverToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid Naver credentials');
    }
    return { message: 'Naver login successful', user };
  }
}
