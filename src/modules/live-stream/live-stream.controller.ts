import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from 'src/common/decorators/allow-unauthorize-request.decorator';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { convertToObjectIdMongodb } from 'src/common/utils';
import { User } from '../user/user.model';
import { LiveStreamService } from './live-stream.service';

@Controller('live-stream')
export class LiveStreamController {
  constructor(private readonly liveStreamService: LiveStreamService) {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  getRoomByUserId(@GetUser() userInfo: User) {
    return this.liveStreamService.getLiveStreamByUserId(
      convertToObjectIdMongodb(userInfo._id),
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get('all')
  getAllRooms() {
    return this.liveStreamService.getAllRooms();
  }
}
