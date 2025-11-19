import {
  IsString,
  IsEmail,
  IsInt,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsInt()
  age?: number;
}
