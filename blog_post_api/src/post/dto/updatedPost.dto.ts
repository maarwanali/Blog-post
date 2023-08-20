import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @Length(3, 300)
  title: string;
  @IsOptional()
  @IsString()
  @Length(10, 10000)
  body: string;
}
