import type { Request, Response } from "express";
import * as verifyService from './verify.service.js';
import { StatusCodes } from "http-status-codes";

import { VerifyMessageSchema } from "./verify.schema.js";
import { getMessageUrlDetail } from "../../helpers/verify.helper.js";
import { locales } from "../../locales/index.js";
import { getLocale } from "../../locales/locale.js";

export const verifyUrl = async (req: Request, res: Response): Promise<void> => {

    const { message } = VerifyMessageSchema.parse(req.body);

    const lang = getLocale(req);
    const t = locales[lang];

    console.log('accept-language', req.get("accept-language"));
    console.log('Resolved language', req.acceptsLanguages("id", "en"));
    console.log('headers', req.headers);
    console.log('raw headers', req.rawHeaders);
    console.log('acceplanguage', req.acceptsLanguages());

    const urlDetail = getMessageUrlDetail(message);

    console.log('url detail', urlDetail);

    if (urlDetail.hasIp) {
        res.status(StatusCodes.OK).json({
            hasIp: urlDetail.hasIp,
            verified: false,
            message: t.ipWarning,
            bank: null,
        });
        return;
    }

    if (!urlDetail.domain) {
        res.status(StatusCodes.OK).json({
            hasIp: urlDetail.hasIp,
            verified: false,
            message:t.noUrl,
            bank: null
        });
        return;
    };
    
    
   const result = await verifyService.verifyUrl(urlDetail.domain);

    if (!result.verified) {
        res.status(StatusCodes.OK).json({
            verified: result.verified,
            message: t.domainNotVerified,
            hasIp: urlDetail.hasIp,
            bank: null
        });
        return;
    };

    res.status(StatusCodes.OK).json({
        verified: true,
        message: t.domainVerified(result.bank.name),
        hasIp: urlDetail.hasIp,
        bank: result.bank
    })
};