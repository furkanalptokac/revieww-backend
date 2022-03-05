import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IExtendedRequest } from './verifyToken.type';

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
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).send({ error: 'Invalid token.' });
  }
};

export default verifyToken;
