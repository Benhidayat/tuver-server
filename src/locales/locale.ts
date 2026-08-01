import type { Request } from "express";
import type { Locale } from "../modules/verify/verify.types.js";

export const getLocale = (req: Request): Locale => {
    if(!req.get("Accept-Language")) return "en"

    return (req.acceptsLanguages("id", "en") as Locale ) ?? "en";
};