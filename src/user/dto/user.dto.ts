
import { IsString, IsEmail,IsOptional,IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsOptional()
  zodiac?: string;

  @IsOptional()
  horoscope?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: Date;
}

export class LoginUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}


export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsDateString()
  birthdate?: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly horoscope?: string;

  @IsOptional()
  @IsString()
  readonly zodiac?: string;
}
