import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AppConfigService } from '../../../config/app-config.service';
import { AuthRepository } from '../repositories/auth.repository';
import { JwtUser } from '../types/jwt-payload.type';
import { AuthUnauthorizedException } from '../../../common/exceptions/auth-unauthorized.exception';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: AppConfigService,
        private readonly authRepository: AuthRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.jwtSecret,
        });
    }

    async validate(payload: JwtUser): Promise<JwtUser> {
        const user = await this.authRepository.findUserById(payload.sub);

        if (!user) {
            throw new AuthUnauthorizedException();
        }

        return {
            sub: payload.sub,
            email: payload.email,
        };
    }
}
