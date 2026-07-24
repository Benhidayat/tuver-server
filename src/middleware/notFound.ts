import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError.js";

const notFound = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const error = new AppError(404, `Route ${req.originalUrl} not found`);
    next(error);
};

export default notFound;