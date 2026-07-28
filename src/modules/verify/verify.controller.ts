import type { Request, Response } from "express";
import * as verifySerivce from './verify.service.js';
import { StatusCodes } from "http-status-codes";

import { VerifyUrlSchema } from "./verify.schema.js";

export const verifyUrl = async (req: Request, res: Response) => {

    const body = VerifyUrlSchema.parse(req.body);
    
    const result = await verifySerivce.verifyUrl(body.domain);

    if (!result.verified) {
        return res.status(StatusCodes.OK).json({
            verified: false,
            message: 'This domain is not recognized.',
            bank: null
        });
    };

    return res.status(StatusCodes.OK).json({
        verified: true,
        message: `This domain is the offical domain of ${result.bank?.name}.`,
        bank: result.bank
    })
};