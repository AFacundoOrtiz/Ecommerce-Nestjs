import { NextFunction, Request, Response } from 'express';

export function loggerMiddle(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toISOString();
  console.log(`Executing a method ${req.method} on route ${req.url} [${now}]`);
  next();
}
