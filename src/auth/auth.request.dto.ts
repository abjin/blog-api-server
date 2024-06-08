import { IsString, MinLength } from 'class-validator';

export class CreateAccountRequestBodyDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(5)
  password: string;
}
