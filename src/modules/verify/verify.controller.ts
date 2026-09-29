import type { Request, Response } from "express";
import * as verifyService from './verify.service.js';
import { StatusCodes } from "http-status-codes";

import { VerifyMessageSchema } from "./verify.schema.js";
import { getMessageUrlDetail } from "../../helpers/verify.helper.js";
import { locales } from "../../locales/index.js";
import { getLocale } from "../../locales/locale.js";
import type { VerifyResult } from "./verify.types.js";
// import { type VerifyResult } from "./verify.types.js";

export const verifyUrl = async (req: Request, res: Response): Promise<void> => {

    // get message and country from request
    const { message, country } = VerifyMessageSchema.parse(req.body);

    // set response messagges based on user prefered ang
    const lang = getLocale(req);
    const t = locales[lang];
    
    const messageDetail = getMessageUrlDetail(message, country);

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
    if (messageDetail.parsedUrls.length === 0 && messageDetail.numberFound.length === 0) {
        res.status(StatusCodes.OK).json({
            hasIp: messageDetail.hasIp,
            verified: false,
            message:t.nothingToVerify,
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

    let institution: VerifyResult = {
        verified: false,
        bank: null
    };

    // loop for urls
    for (const parsedUrl of messageDetail.parsedUrls) {
        if (!parsedUrl.domain) {
            continue;
        };

        // if institution is null do query to db
        if (!institution.verified) {

            const result = await verifyService.verifyUrl(parsedUrl.domain);
    
            if (!result.verified) {
                const messageResult = await verifyService.verifyMessage(messageDetail.textWithoutUrl);
    
                if (!messageResult) {
                    res.status(StatusCodes.OK).json({
                        verified: result.verified,
                        message: t.domainNotVerified,
                        hasIp: messageDetail.hasIp,
                        bank: null
                    })
                } else {
                    res.status(StatusCodes.OK).json({
                        verified: result.verified,
                        message: t.domainNotOfficial(messageResult.name),
                        hasIp: messageDetail.hasIp,
                        bank: null
                    })
                }
                return;
            };
            
            institution = result;
        };

        const result = institution.bank.domains.some(domain => domain.domain === parsedUrl.domain);

        // domain not official return and warn
        if (!result) {
            res.status(StatusCodes.OK).json({
                verified: false,
                message: t.domainNotOfficial(institution.bank.name)
            })
            return;
        }

    };

    for (const number of messageDetail.numberFound) {
        const result = await verifyService.verifyNumber(number.number.number);

        if (!result.verified) {
            const messageResult = await verifyService.verifyMessage(messageDetail.textWithoutUrl);

            if (!messageResult) {
                res.status(StatusCodes.OK).json({
                    verified: result.verified,
                    message: t.phoneNotVerified,
                    hasIp: messageDetail.hasIp,
                    bank: null
                })
            } else {
                res.status(StatusCodes.OK).json({
                    verified: result.verified,
                    message: t.phoneNotOfficial,
                    hasIp: messageDetail.hasIp,
                    bank: null
                })
            };
            return;
        };
    }; 
}