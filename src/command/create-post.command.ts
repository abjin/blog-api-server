import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostCommand {
  @Command({ command: 'create:post' })
  async create() {
    console.log('this is create:post command');
  }
}
