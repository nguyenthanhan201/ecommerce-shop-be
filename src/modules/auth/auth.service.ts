import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';
import { AuthLoginDto } from './dto/authLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async sendMail() {
    return this.emailService.sendMail();
  }

  async getUserByEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  async signIn(userData: AuthLoginDto) {
    let user = await this.userService.findOne(userData.email);

    if (!user) {
      user = await this.userService.create(userData as any).then((res) => {
        return res;
      });
    }

    const payload = { ...user, refeshToken: '' };

    const access_token = await this.generateToken(payload, '1d');
    const refesh_token = await this.generateToken(payload, '7d');

    // await this.userService.update(user._id, {
    //   ...user,
    //   refeshToken: refesh_token,
    // });

    // response.cookie('Authentication', access_token, {
    //   httpOnly: true,
    //   expires: this.expiresAccessToken(),
    // });

    // TODO: refactor model user do not need refeshToken
    delete user.refeshToken;

    return {
      access_token,
      refesh_token,
      user,
    };
  }

  async generateToken(user: User, expiresIn: string) {
    return await this.jwtService.signAsync(user, {
      expiresIn,
    });
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }

  async refeshToken(refeshToken: string) {
    const payload = await this.verifyToken(refeshToken);
    console.log('👌  payload:', payload);

    const access_token = await this.generateToken(
      {
        _id: payload._id,
        email: payload.email,
        name: payload.name,
      },
      '10s',
    );
    // response.cookie('Authentication', access_token, {
    //   httpOnly: true,
    //   expires: expiresAccessToken,
    // });
    // 💡 We're assigning the payload to the request object here
    // so that we can access it in our route handlers`
    // request['user'] = payload;
    // console.log('👌  request:', email);
    // const user = await this.userService.findOne(refeshToken);
    // console.log('👌  user:', user);
    return {
      access_token,
      user: payload,
    };
  }
}
