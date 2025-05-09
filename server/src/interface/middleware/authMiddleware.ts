import { Request, Response, NextFunction } from 'express';
import { IAuthService } from '../../domain/services/IAuthService';
import { UserRole } from '../../domain/enums/UserRole';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export class AuthMiddleware {
  constructor(private authService: IAuthService) {}

  authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;
      const refreshToken = req.headers['x-refresh-token'] as string;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Access token required', success: false });
        return;
      }

      const accessToken = authHeader.split(' ')[1];
      let decoded = this.authService.verifyToken(accessToken);

      if (!decoded && refreshToken) {
        decoded = this.authService.verifyRefreshToken(refreshToken);

        if (decoded) {
          const newTokens = this.authService.generateTokens(decoded.userId, decoded.role);
          res.setHeader('Authorization', `Bearer ${newTokens.accessToken}`);
        } else {
          res.status(401).json({ message: 'Session expired. Please login again.', success: false });
          return;
        }
      }

      if (!decoded) {
        res.status(401).json({ message: 'Invalid or expired token', success: false });
        return;
      }

      req.userId = decoded.userId;
      req.userRole = decoded.role;

      next();
    } catch (error) {
      console.error('Auth error:', error);
      res.status(500).json({ message: 'Authentication failed', success: false });
      return;
    }
  };

  authorizeRole = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      if (!req.userRole || !roles.includes(req.userRole as UserRole)) {
        res.status(403).json({ message: 'Access denied: insufficient permissions', success: false });
        return;
      }
      next();
    };
  };

  adminOnly = (req: Request, res: Response, next: NextFunction): void => {
    if (req.userRole !== UserRole.ADMIN) {
      res.status(403).json({ message: 'Access denied: admin only', success: false });
      return;
    }
    next();
  };

  managerOrAdmin = (req: Request, res: Response, next: NextFunction): void => {
    if (![UserRole.MANAGER, UserRole.ADMIN].includes(req.userRole as UserRole)) {
      res.status(403).json({ message: 'Access denied: manager or admin only', success: false });
      return;
    }
    next();
  };
}
