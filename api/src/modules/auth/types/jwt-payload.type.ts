export type JwtUser = {
    sub: string;
    email: string;
};

export type JwtPayload = {
    sub: string;
    email: string;
};

export type AccessTokenPayload = {
    sub: string;
    email: string;
};

export type RefreshTokenPayload = {
    sub: string;
    email: string;
    jti: string;
};

export type TokenPairPayload = {
    id: string;
    email: string;
};

export type TokenPairData = {
    accessToken: string;
    refreshToken: string;
};

export type CreateRefreshTokenData = {
    id: string;
    userId: string;
    tokenHash: string;
    expiresAt: Date;
};
