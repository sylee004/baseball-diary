import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { UserService } from '../user/user.service'
import { USER_PROVIDER_TYPE } from '../../enums'

@Injectable()
export class NaverAuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UserService,
  ) {}

  async validateNaverToken(token: string) {
    const url = `https://openapi.naver.com/v1/nid/me`;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      );
      const naverUser = response.data.response;

      let user = await this.usersService.findByEmail(naverUser.email);
      let result = undefined
      if (!user) {
        result = await this.usersService.createUser({
          username: naverUser.name,
          password: 'random-password',
          email: naverUser.email,
          type: USER_PROVIDER_TYPE.NAVER
        });
      }
      return result?.user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Naver token');
    }
  }
}
