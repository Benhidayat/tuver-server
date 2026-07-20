import type { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Body:', req.body);
    console.log('---');
    next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
    res.status(404).send({ error: 'Unknown endpoint' })
};

export const errorHandler = (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next(error);
};