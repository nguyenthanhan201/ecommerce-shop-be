import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImagekitService } from 'src/config/upload/configuration';

@Injectable()
export class UploadService {
  async getList() {
    try {
      const list = await ImagekitService.listFiles({
        path: '/products',
        skip: 0,
        limit: 10,
      });
      return list;
    } catch (error) {
      throw new HttpException(
        JSON.stringify(error, null, 2),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const { buffer, originalname } = file;
    // console.log('👌  file:', file);

    try {
      const uploadedFile = await ImagekitService.upload({
        file: buffer.toString('base64'),
        fileName: originalname,
        folder: '/products',
      });

      return uploadedFile;
    } catch (error) {
      console.log('👌  error:', error);
      throw new HttpException(
        JSON.stringify(error, null, 2),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteFile(fileId: string) {
    try {
      const deletedFile = await ImagekitService.deleteFile(fileId);
      return deletedFile;
    } catch (error) {
      console.log('👌  error:', error);
      throw new HttpException(
        JSON.stringify(error, null, 2),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
