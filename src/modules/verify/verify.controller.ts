import type { Request, Response } from "express";
import * as verifyService from './verify.service.js';
import { StatusCodes } from "http-status-codes";

import { VerifyUrlSchema } from "./verify.schema.js";
import { getMessageUrlDetail } from "../../helpers/verify.helper.js";

export const verifyUrl = async (req: Request, res: Response): Promise<void> => {

    const body = VerifyUrlSchema.parse(req.body);

    const urlDetail = getMessageUrlDetail(body.message);

    if (urlDetail.hasIp) {
        res.status(StatusCodes.OK).json({
            hasIp: urlDetail.hasIp,
            verified: false,
            message: 'Warning: This message contains a link that uses an IP address instead of a domain. Legitimate organizations rarely send links like this. Proceed with caution.',
            bank: null,
        });
        return;
    }

    if (!urlDetail.domain) {
        res.status(StatusCodes.OK).json({
            hasIp: urlDetail.hasIp,
            verified: false,
            message:'No URL found in the message',
            bank: null
        });
        return;
    };
    
    
   const result = await verifyService.verifyUrl(urlDetail.domain);

    if (!result.verified) {
        res.status(StatusCodes.OK).json({
            verified: result.verified,
            message: `This domain ${urlDetail.domain} could not verified as an official domain`,
            hasIp: urlDetail.hasIp,
            bank: null
        });
        return;
    };

    res.status(StatusCodes.OK).json({
        verified: true,
        message: `This domain is the offical domain of ${result.bank.name}.`,
        hasIp: urlDetail.hasIp,
        bank: result.bank
    })
};