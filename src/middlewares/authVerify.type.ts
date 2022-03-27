import { Request } from 'express';

export type UserType = {
  _id: string;
  email: string;
  iat: number;
  exp: number;
};

export interface IExtendedRequest extends Request {
  user?: UserType;
}
