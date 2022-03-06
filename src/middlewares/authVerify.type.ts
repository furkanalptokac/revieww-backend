import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type UserType = {
  _id: string;
  email: string;
  iat: number;
  exp: number;
};

type Decoded = string | JwtPayload;

export interface IExtendedRequest extends Request {
  user?: UserType | Decoded;
}
