import { HttpService } from '@nestjs/axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable()
export class GoogleAuthService {
  constructor(
    private httpService: HttpService,
    private usersService: UserService,
  ) {}

  async validateGoogleToken(token: string) {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const googleUser = response.data;

      let user = await this.usersService.findByEmail(googleUser.email);
      if (!user) {
        user = await this.usersService.createUser(
          googleUser.name,
          'random-password',
          googleUser.email,
        );
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Google token');
    }
  }
}
