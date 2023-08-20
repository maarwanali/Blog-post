import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  role: 'user' | 'admin';
}
