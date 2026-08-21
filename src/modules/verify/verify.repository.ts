import { prisma } from '../../db/prisma.js';

export const findDomain = async (domain: string) => {
    const result = await prisma.domain.findUnique({
        where: { domain },
        include: {
            institution: {
                include: {
                    domains: true,
                    aliases: true
                },
            },
        },
    });

    return result?.institution ?? null;
};

export const getAllAliases = async() => {
    const result = await prisma.alias.findMany({
        include: {
            institution: true,
        }
    });
       

    return result;
};