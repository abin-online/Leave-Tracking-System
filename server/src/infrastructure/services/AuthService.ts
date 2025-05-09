import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { IAuthService } from '../../domain/services/IAuthService';

export class AuthService implements IAuthService {
  private readonly JWT_SECRET: Secret;
  private readonly JWT_REFRESH_SECRET: Secret;
  private readonly JWT_EXPIRATION: string;
  private readonly JWT_REFRESH_EXPIRATION: string;

  constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret';
    this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-jwt-refresh-secret';
    this.JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';
    this.JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION || '7d';
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  generateTokens(userId: string, role: string): { accessToken: string; refreshToken: string } {
    const payload: { userId: string; role: string } = { userId, role };

    const accessToken = jwt.sign(
      payload,
      this.JWT_SECRET,
      {
        expiresIn: this.JWT_EXPIRATION
      } as SignOptions
    );

    const refreshToken = jwt.sign(
      payload,
      this.JWT_REFRESH_SECRET,
      {
        expiresIn: this.JWT_REFRESH_EXPIRATION
      } as SignOptions
    );

    return { accessToken, refreshToken };
  }

  verifyToken(token: string): { userId: string; role: string } | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string; role: string };
      return decoded;
    } catch {
      return null;
    }
  }

  verifyRefreshToken(token: string): { userId: string; role: string } | null {
    try {
      const decoded = jwt.verify(token, this.JWT_REFRESH_SECRET) as { userId: string; role: string };
      return decoded;
    } catch {
      return null;
    }
  }
}
