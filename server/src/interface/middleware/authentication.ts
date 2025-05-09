// // interface/middleware/authorize.ts
// import { Request, Response, NextFunction } from 'express';
// import { UserRole } from '../../domain/enums/UserRole';

// export function authorize(allowedRoles: UserRole[]) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const user : any = req?.user; // Assume user is attached to the request
//     if (!user || !allowedRoles.includes(user.role)) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
//     next();
//   };
// }
