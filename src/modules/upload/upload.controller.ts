import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileImgValidationPipe } from 'src/common/pipes/file-img-validate';
import { FileDeleteDto } from './dto/fileDelete.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Get('file')
  async getList() {
    return this.uploadService.getList();
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new FileImgValidationPipe())
    file: Express.Multer.File,
  ) {
    // console.log('👌  file:', file);
    return this.uploadService.uploadFile(file);
  }

  @Delete('file')
  async deleteFile(@Body() body: FileDeleteDto) {
    const { fileId } = body;

    return this.uploadService.deleteFile(fileId);
  }
}
