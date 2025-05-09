import { Request, Response, NextFunction } from 'express';

export class ErrorMiddleware {
  handleErrors = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message });
      return;
    }
    
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    
    // Default error
    res.status(500).json({ message: 'Internal server error' });
  };

  handleNotFound = (req: Request, res: Response): void => {
    res.status(404).json({ message: 'Resource not found' });
  };
}