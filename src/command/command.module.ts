import { Module } from '@nestjs/common';
import { PostCommand } from './create-post.command';
import { CommandModule as NestJsCommandModule } from 'nestjs-command';

@Module({
  imports: [NestJsCommandModule],
  providers: [PostCommand],
})
export class CommandModule {}
