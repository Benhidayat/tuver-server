import { prisma } from '../src/db/prisma.ts';

export const main = async () => {
    const bank = await prisma.bank.upsert({
        where: {
            name_country: {
                name: 'PT Bank Rakyat Indonesia',
                country: 'Indonesia'
            },
        },
        update: {},
        create: {
            name: 'PT Bank Rakyat Indonesia',
            country: 'Indonesia',
            domains: {
                create: {
                    domain: 'bri.co.id'
                }
            },
        },
        include: {
            domains: true
        },
    });

    console.log('Created a bank:', bank);

    const fetchAllBanks = await prisma.bank.findMany({
        include: {
            domains: true,
        },
    })

    console.log('All banks: ', JSON.stringify(fetchAllBanks, null, 2));
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })

