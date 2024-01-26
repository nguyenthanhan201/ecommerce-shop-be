import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailConsumer } from 'src/common/jobs/consumers/email.job.consumer';
import { EmailProducer } from 'src/common/jobs/providers/email.job.producer';
import { EmailModule } from '../email/email.module';
import { UserSchema } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EmailModule,
    BullModule.registerQueue({
      name: 'send-mail',
    }),
  ],
  providers: [UserService, EmailProducer, EmailConsumer],
  exports: [UserService],
})
export class UserModule {}
