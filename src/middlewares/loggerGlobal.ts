import { NextFunction, Request, Response } from 'express';

export function loggerMiddle(req: Request, res: Response, next: NextFunction) {
  const now = new Date().toISOString();
  console.log(
    `Estás ejecutando un método ${req.method} en la ruta ${req.url} [${now}]`,
  );
  next();
}
