import { LocalAccount } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CreateAccountResponseDto {
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  constructor(partial: LocalAccount) {
    Object.assign(this, partial);
  }
}
