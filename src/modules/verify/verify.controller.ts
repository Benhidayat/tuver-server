import type { Request, Response } from "express";
import * as verifySerivce from './verify.service.js';
import { StatusCodes } from "http-status-codes";

import { VerifyUrlSchema } from "./verify.schema.js";
import { getUrlDetail } from "../../helpers/verify.helper.js";

export const verifyUrl = async (req: Request, res: Response) => {

    const body = VerifyUrlSchema.parse(req.body);

    const urlDetail = getUrlDetail(body.message);

    if (!urlDetail.domain) {
        return res.status(StatusCodes.OK).json({
            verified: false,
            message:'No URL found in the message',
            bank: null
        });
    };
    
    
    const result = await verifySerivce.verifyUrl(urlDetail?.domain);

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