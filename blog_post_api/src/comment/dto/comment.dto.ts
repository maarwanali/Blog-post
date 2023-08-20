import { IsString, IsNotEmpty } from 'class-validator';

export class CommentDto {
  @IsNotEmpty()
  @IsString()
  body: string;
  @IsNotEmpty()
  postId: number;
}
