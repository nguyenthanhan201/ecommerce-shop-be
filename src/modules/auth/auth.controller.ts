import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/libs/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() body: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(body);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('refesh-token')
  async refeshToken(@Request() request, @Res({ passthrough: true }) response) {
    const refeshToken = request.headers['x-refresh-token'];

    const { access_token, user } = await this.authService.refeshToken(
      refeshToken,
    );

    response.cookie('Authentication', access_token, {
      httpOnly: true,
    });

    return {
      access_token,
      user,
    };
  }

  @Post('getUserByEmail')
  async getUserByEmail(@Body() body: { email: string; name: string }) {
    const { email } = body;
    return this.authService.getUserByEmail(email);
  }
}
