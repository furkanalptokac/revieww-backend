import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface IExtendedRequest extends Request {
  user: string | JwtPayload;
}
