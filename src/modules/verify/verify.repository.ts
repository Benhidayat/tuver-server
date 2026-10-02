import { prisma } from '../../db/prisma.js';

export const findDomain = async (domain: string) => {
    const result = await prisma.domain.findUnique({
        where: { domain },
        include: {
            institution: {
                include: {
                    domains: true,
                    aliases: true,
                    telephones: true
                },
            },
        },
    });

    return result?.institution ?? null;
};

export const findPhone = async(number: string) => {
    const result = await prisma.telephone.findUnique({
        where: { number },
        include: {
            institution: {
                include: {
                    domains: true,
                    telephones: true,
                    aliases: true
                }
            }
        }
    });

    return result?.institution ?? null
};

export const getAllAliases = async() => {
    const result = await prisma.alias.findMany({
        include: {
            institution: true,
        }
    });
       

    return result;
};