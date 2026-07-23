import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.ts";

const notFound = (
    next: NextFunction,
    req: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _res: Response
) => {
    const error = new AppError(404, `Route ${req.originalUrl} not found`);
    next(error);
};

export default notFound;