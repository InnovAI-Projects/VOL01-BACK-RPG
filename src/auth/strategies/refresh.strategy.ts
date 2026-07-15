import { type ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import refreshJwtConfig from '../config/refresh-jwt.config';
import { Injectable, Inject } from '@nestjs/common';
import { AuthJwtPayload } from '../types/auth-jwtPayload';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    @Inject(refreshJwtConfig.KEY)
    private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfiguration.secret as string,
      ignoreExpiration: false,
    });
  }

  validate(payload: AuthJwtPayload) {
    return { id: payload.sub, name: payload.name, email: payload.email };
  }
}
