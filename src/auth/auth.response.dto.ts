import { ApiProperty } from '@nestjs/swagger';
import { LocalAccount } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateAccountResponseDto {
  @ApiProperty({ description: '유저이름' })
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  constructor(partial: LocalAccount) {
    Object.assign(this, partial);
  }
}
