import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { IExtendedRequest, UserType } from './authVerify.type';

const verifyToken = (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded as unknown as UserType;
    next();
  } catch (error) {
    return res.status(400).send({ error: 'Invalid token.' });
  }
};

// TODO: id: any
const verifyObjectId =
  (id: string) =>
  (req: IExtendedRequest, res: Response, next: NextFunction) => {
    if (!mongoose.Types.ObjectId.isValid(req.params[id])) {
      return res.status(400).send({ error: 'Invalid ID.' });
    }
    next();
  };

export { verifyToken, verifyObjectId };
