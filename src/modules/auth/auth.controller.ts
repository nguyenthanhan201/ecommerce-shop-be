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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/libs/common/guards/jwt-guard.guard';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  signIn(
    @Body() body: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(body);
  }

  @UseGuards(JwtAuthGuard)
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

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return {
      message: 'success',
    };
  }
}
