import { IsString, IsNotEmpty, Length } from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  title: string;
  @IsNotEmpty()
  @IsString()
  @Length(10, 10000)
  body: string;

  @IsNotEmpty()
  categoryId: string;
}
