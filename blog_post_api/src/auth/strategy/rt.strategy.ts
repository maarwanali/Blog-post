import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class rtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        rtStrategy.extractTokenFromCookie,
      ]),
      secretOrKey: config.get('REFRESHTOKEN_SECRETKEY'),
    });
  }

  async validate(payload: any) {
    return payload;
  }

  private static extractTokenFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.refresh_token) {
      return req.cookies.refresh_token;
    }

    return null;
  }
}
