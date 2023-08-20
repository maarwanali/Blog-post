import { Exclude } from 'class-transformer';

export class UserDto {
  id: number;
  username: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  passwordHash: string;
  role: string;
  @Exclude()
  rtHash: string;
  @Exclude()
  rtExpireDate: Date;
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
