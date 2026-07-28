import { prisma } from '../../db/prisma.js';

export const findDomain = async (domain: string) => {

    const result = await prisma.domain.findUnique({
        where: {
            domain,
        },
        include: {
            bank: {
                include: {
                    domains: true,
                }
            }
        },
    })

    return result?.bank ?? null;
};