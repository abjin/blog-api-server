import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateAccountRequestBodyDto {
  @ApiProperty({ description: '유저이름' })
  @IsString()
  username: string;

  @ApiProperty({ description: '비밀번호' })
  @IsString()
  @MinLength(5)
  password: string;
}

export class LoginRequestBodyDto {
  @ApiProperty({ description: '유저이름' })
  username: string;

  @ApiProperty({ description: '비밀번호', minLength: 5 })
  password: string;
}
