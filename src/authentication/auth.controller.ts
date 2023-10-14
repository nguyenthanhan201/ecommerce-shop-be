import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request as RequestExpress, Response } from 'express';
import { Public } from 'src/common/decorators/allow-unauthorize-request.decorator';
import coreHelper from 'src/common/helpers/coreHelper';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/authLogin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post()
  sendMail() {
    return this.authService.sendMail();
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  signIn(
    @Body() body: AuthLoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.signIn(body);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('refresh-token')
  async refeshToken(
    @Req() request: RequestExpress,
    @Res({ passthrough: true }) response,
  ) {
    const refreshToken = coreHelper.removeQuotes(request.cookies.refreshToken);

    const { access_token, user } = await this.authService.refreshToken(
      refreshToken,
    );

    // response.cookie('token', access_token, {
    //   httpOnly: true,
    // });

    return {
      access_token,
      user,
    };
  }

  @Post('getUserByEmail')
  async getUserByEmail(
    @Req() request: any,
    @Body() body: { email: string; name: string },
  ) {
    // console.log('👌  request:', request);
    // const token = coreHelper.removeQuotes(request.cookies.token);

    // const payload = await this.authService.verifyToken(token);
    // console.log('👌  payload:', payload);
    // const { email } = body;
    // return this.authService.getUserByEmail(email);
    return request.user;
  }

  @Public()
  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request: RequestExpress,
  ) {
    // console.log('👌  request:', request.cookies.token);
    // response.clearCookie('Authentication');

    const accessToken = coreHelper.removeQuotes(request.cookies.token);

    if (accessToken) await this.authService.logout(accessToken);
    return {
      message: 'success',
    };
  }
}
