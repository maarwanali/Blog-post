import { Exclude, Type } from 'class-transformer';
import { UserDto } from 'src/auth/dto';

export class commentResponse {
  id: number;
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  body: string;
  // @Exclude()
  userId: number;
  @Type(() => UserDto)
  user: UserDto;
  @Exclude()
  postId: number;

  constructor(partial: Partial<commentResponse>) {
    Object.assign(this, partial);
  }
}
