import { StatusCodes } from "http-status-codes";

export class AppError extends Error {
    constructor(
        message: string,
        public statusCode: number,
        public isOperational = true
    ) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor)
    };
};

export class NotFoundError extends AppError {
    constructor(message = 'Resouce not found') {
        super(message, StatusCodes.NOT_FOUND)
    };
};