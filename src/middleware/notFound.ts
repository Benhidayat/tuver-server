import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/appError.js";

const notFound = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    const error = new AppError(`Route ${req.originalUrl} not found`, 404);
    next(error);
};

export default notFound;