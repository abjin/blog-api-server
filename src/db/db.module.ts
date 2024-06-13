import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'src/db/prisma-exception.filter';
import { EmailModule } from '@libs/email';

@Global()
@Module({
  imports: [EmailModule],
  providers: [
    PrismaService,
    { provide: APP_FILTER, useClass: PrismaClientExceptionFilter },
  ],
  exports: [PrismaService],
})
export class DbModule {}
