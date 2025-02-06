import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { EntityManager, Repository } from 'typeorm'

import { User, UserProvider } from './entities';
import { USER_PROVIDER_TYPE } from '../../enums'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(UserProvider)
    private userProviderRepository: Repository<UserProvider>,
  ) {}

  async findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async createUser(
    data: {
      username: string,
      password: string,
      email: string,
      type: USER_PROVIDER_TYPE
    }): Promise<{ user: User, userProvider: UserProvider }> {
    const { username, password, email, type } = data
    return await this.usersRepository.manager.transaction(async (manager: EntityManager) => {
      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);

      // User 생성
      const user = manager.create(User, {
        username,
        password: hashedPassword,
        email,
      });
      const savedUser = await manager.save(user);

      const userProvider = manager.create(UserProvider, {
        user: savedUser,
        type: USER_PROVIDER_TYPE.EMAIL,
      });
      const savedUserProvider = await manager.save(userProvider);
      console.log('savedUser : ', savedUser, ' savedProvider : ', savedUserProvider)
      return { user: savedUser, userProvider: savedUserProvider }
    });
  }
}
