import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendEmail(mail: { to: string; subject: string; html: string }) {
    return this.mailerService.sendMail(mail);
  }
}
