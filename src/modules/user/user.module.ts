import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailConsumer } from 'src/common/consumers/email.consumer';
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
  providers: [UserService, EmailConsumer],
  exports: [UserService],
})
export class UserModule {}
