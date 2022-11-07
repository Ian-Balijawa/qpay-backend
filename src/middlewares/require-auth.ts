import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors';
import { verifyToken } from '../services/token';

export interface UserPayload {
  id: string;
  phone: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
declare module 'express-session' {
  interface SessionData {
    jwt?: string;
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new BadRequestError('Unauthorised!!!'));
  }

  const token: string = bearer.split('Bearer ')[1].trim();

  if (!token) {
    throw new BadRequestError('Not authorized');
  }

  try {
    const payload = (await verifyToken(token)) as unknown as UserPayload;
    req.user = payload;
  } catch (err) {
    throw new BadRequestError('Not authorized');
  }

  next();
};
