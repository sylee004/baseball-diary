import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { USER_PROVIDER_TYPE } from '../../../enums'

@Entity()
export class UserProvider {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.providers)
  user!: User;

  @Column({ enum: USER_PROVIDER_TYPE })
  type!: USER_PROVIDER_TYPE;

  @Column({ nullable: true })
  accessToken!: string;

  @Column({ nullable: true })
  refreshToken!: string;
}
