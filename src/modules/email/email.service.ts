import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail() {
    return this.mailerService.sendMail({
      to: 'fxannguyen201@gmail.com',
      from: 'mss.harmohan@gmail.com',
      subject: 'Testing NestJs MailerModule ✔',
      text: 'welcome',
      html: '<b>welcome</b><img class="imagemodule__img " width="700" src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/1521/Tem_2_image_1_2.png" alt="Alternate text">',
    });
  }
}
