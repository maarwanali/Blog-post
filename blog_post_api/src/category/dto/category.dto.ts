import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategroyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color: string;
}
