import { HttpStatusCode } from './HttpStatusCode';

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: HttpStatusCode;
}