import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUnauthorizedException } from '../exceptions/auth-unauthorized.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        if (err || !user) {
            throw err || new AuthUnauthorizedException();
        }
        return user;
    }
}
