import { prisma } from '../src/db/prisma.js';
import { normalizePhoneNumber } from '../src/shared/phone.js';

export const main = async () => {
    const bank = await prisma.financialInstitution.upsert({
        where: {
            name_country: {
                name: 'PT Bank Rakyat Indonesia',
                country: 'ID',
                
            },
        },
        update: {},
        create: {
            name: 'PT Bank Rakyat Indonesia',
            country: 'ID',
            domains: {
                create: {
                    domain: 'bri.co.id'
                }
            },
            telephones: {
                create: {
                    number: normalizePhoneNumber('(021) 2510244', 'ID')
                }
            },
            aliases: {
                create: [
                    { alias: 'bri' },
                    { alias: 'bank rakyat indonesia' }
                ],
            }
        },
        include: {
            domains: true,
            telephones: true,
            aliases: true,
        },
    });

    console.log('Created a bank:', bank);

    const fetchAllBanks = await prisma.financialInstitution.findMany({
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

