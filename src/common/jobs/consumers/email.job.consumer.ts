import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from 'src/modules/email/email.service';

@Processor('send-mail')
export class EmailConsumer {
  constructor(private readonly emailService: EmailService) {}

  @Process('register')
  async sendMailRegister(job: Job<unknown>) {
    // console.log('👌  job:', job);
    await this.emailService.sendMail(job.data['email']);
  }
}
