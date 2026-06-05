import { Controller, Post, Body, Get, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/payload/login.dto';
import { RefreshTokenDto } from '../dto/payload/refresh-token.dto';
import { AuthResponse } from '../dto/response/auth-response.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/types/request-user.type';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { ResponseDto } from 'src/common/dto/response/api-response.dto';
import { User } from '../../user/entities/user.entity';
import { UserResponse } from '../dto/response/user-response.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({ description: 'Login success', type: ResponseDto(AuthResponse) })
    @ApiOperation({ summary: 'Login with email and password' })
    @HttpCode(HttpStatus.OK)
    @Throttle({ default: { limit: 5, ttl: 60000 } })
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Public()
    @Post('refresh')
    @ApiBody({ type: RefreshTokenDto })
    @ApiOkResponse({ description: 'Refresh token success', type: ResponseDto(AuthResponse) })
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Refresh access token' })
    @Throttle({ default: { limit: 10, ttl: 60000 } })
    async refresh(@Body() dto: RefreshTokenDto) {
        return this.authService.refresh(dto.refreshToken);
    }

    @Delete('logout')
    @ApiBody({ type: RefreshTokenDto })
    @ApiOkResponse({ description: 'Logout success' })
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout and revoke refresh token' })
    @SkipThrottle()
    async logout(@Body() dto: RefreshTokenDto) {
        return this.authService.logout(dto.refreshToken);
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current user profile' })
    @ApiOkResponse({ description: 'Current user profile', type: ResponseDto(UserResponse) })
    async getProfile(@CurrentUser() user: RequestUser) {
        return this.authService.getProfile(user.sub);
    }
}
