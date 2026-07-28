import type { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/appError.js";

const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) return next(err);
    if (err instanceof AppError) return res.status(err.statusCode).json({
        success: false,
        error: {
            message: err.message,
            statusCode: err.statusCode
        },
    })

    console.error(err);

    return res.status(500).json({
        success: false,
        error: {
            message: process.env.NODE_ENV === 'production'
                ? 'Internal Server Error'
                : err.message,
            statusCode: 500,
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        },
    })
};

export default errorHandler;