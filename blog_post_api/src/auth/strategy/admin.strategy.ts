import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class adminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESSTOKEN_SECRETKEY'),
    });
  }

  async validate(payload: any): Promise<any> {
    if (payload.role !== 'admin') {
      throw new UnauthorizedException();
    }

    // You can return additional user details if needed
    return payload;
  }
}
