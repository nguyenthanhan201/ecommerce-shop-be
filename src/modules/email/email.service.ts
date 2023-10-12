import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { content } from 'src/mails/wellcome/content';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    return this.mailerService.sendMail({
      to: 'fxannguyen201@gmail.com',
      from: 'mss.harmohan@gmail.com',
      subject: 'Testing NestJs MailerModule ✔',
      text: 'welcome',
      html: content(),
    });
  }
}
