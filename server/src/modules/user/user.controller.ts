import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Post('email/sign-up')
  @ApiOperation({
    summary: '이메일 회원가입 API',
    description: '새로운 이메일로 가입하는 사용자를 등록합니다.',
  })
  @ApiBody({ description: '회원가입 정보', type: Object })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
  @ApiResponse({ status: 400, description: '회원가입 실패' })
  async createEmailUser(@Body() body: { username: string; password: string; email: string }) {
    const user = await this.userService.createUser(body.username, body.password, body.email);
    if (!user) {
      throw new BadRequestException('회원가입 실패');
    }
    return { message: '회원가입 성공', user };
  }
}
