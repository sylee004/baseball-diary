import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { UserProvider } from './user-provider.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ type: 'datetime' })
  verifiedAt!: Date;

  @Column({ nullable: true })
  profilePicture!: string;

  @OneToMany(() => UserProvider, (provider) => provider.user)
  providers!: UserProvider[];
}
