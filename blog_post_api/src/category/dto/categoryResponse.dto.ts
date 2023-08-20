import { Post } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';
export class CategoryResponse {
  id: number;
  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  name: string;
  color: string;
  post: Post[];

  constructor(partial: Partial<CategoryResponse>) {
    Object.assign(this, partial);
  }
}
