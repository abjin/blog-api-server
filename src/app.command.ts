import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class AppCommand {
  constructor(private readonly prismaService: PrismaService) {}
}
