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

    const messageDetail = getMessageUrlDetail(message);

    console.log('url detail', messageDetail);

    // ip found
    if (messageDetail.hasIp) {
        res.status(StatusCodes.OK).json({
            hasIp: messageDetail.hasIp,
            verified: false,
            message: t.ipWarning,
            bank: null,
        });
        return;
    }

    // no domain found
    if (!messageDetail.domain) {
        res.status(StatusCodes.OK).json({
            hasIp: messageDetail.hasIp,
            verified: false,
            message:t.noUrl,
            bank: null
        });
        return;
    };

    // found nested url in the query
    if(messageDetail.hasNestedUrl) {
        res.status(StatusCodes.OK).json({
            hasIp: messageDetail.hasIp,
            verified: false,
            message: t.nestedUrlWarning,
            bank: null
        });
        return;
    }
    
    
   const urlResult = await verifyService.verifyUrl(messageDetail.domain);

    if (!urlResult.verified) {

        const messageResult = await verifyService.verifyMessage(messageDetail.textWithoutUrl);
        
        if (!messageResult) {
            res.status(StatusCodes.OK).json({
                verified: urlResult.verified,
                message: t.noDomainNoAlias,
                hasIp: messageDetail.hasIp,
                bank: null
            });
            return;

        } else {
            res.status(StatusCodes.OK).json({
                verified: urlResult.verified,
                message: t.noDomainAliasFound(messageResult.institution.name),
                hasIp: messageDetail.hasIp,
                bank: null
            });
            return;
        }
    }

    res.status(StatusCodes.OK).json({
        verified: true,
        message: t.domainVerified(urlResult.bank.name),
        hasIp: messageDetail.hasIp,
        bank: urlResult.bank
    })
};