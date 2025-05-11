import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET) as { userId: string; role: string };
    (req as any).user = { userId: decoded.userId, role: decoded.role };
    next(); // ✅ only return next() here — no res.status
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
