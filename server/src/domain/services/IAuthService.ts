export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    generateOTP(): string;
    generateTokens(userId: string, role: string): { accessToken: string; refreshToken: string };
    verifyToken(token: string): { userId: string; role: string } | null;
    verifyRefreshToken(token: string): { userId: string; role: string } | null;
}
