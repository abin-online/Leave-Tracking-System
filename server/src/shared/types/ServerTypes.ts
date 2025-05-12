import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
    userId?: string;
    userRole?: string
}

export interface CustomResponse extends Response {
    sendSuccess<T>(data: T): Response;
    sendError(message: string, statusCode: number): Response;
}

export type CustomNext = NextFunction;