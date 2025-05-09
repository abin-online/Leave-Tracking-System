import { Request, Response, NextFunction } from 'express';
import { User } from '../../domain/entities/User';

export interface CustomRequest extends Request {
    user?: User;
}

export interface CustomResponse extends Response {
    sendSuccess<T>(data: T): Response;
    sendError(message: string, statusCode: number): Response;
}

export type CustomNext = NextFunction;