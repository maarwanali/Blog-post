import { Category } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { UserDto } from 'src/auth/dto';
import { commentResponse } from 'src/comment/dto';

class CategoriesOnPostsResponseDto {
  postId: number;
  categoryId: number;
  @Exclude()
  assignedAt: Date;
  category: Category;
}

export class PostResponseDto {
  id: number;
  createdAt: Date;
  title: string;
  body: string;
  userId: number;
  @Type(() => UserDto)
  user: UserDto;
  @Type(() => commentResponse)
  comments: commentResponse[];
  @Type(() => CategoriesOnPostsResponseDto)
  categories: CategoriesOnPostsResponseDto[];

  constructor(partial: Partial<PostResponseDto>) {
    Object.assign(this, partial);
  }
}
