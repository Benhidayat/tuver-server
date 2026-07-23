import express from 'express';
import type { Request, Response } from 'express';
import { requestLogger } from './middleware/middleware.ts';
import { prisma } from './db/prisma.ts'

const app = express();

app.use(requestLogger);

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello world');
    console.log('Response sent')
});

app.get('/banks', async (_req: Request, res: Response) => {
    const banks = await prisma.bank.findMany({
        include: {
            domains: true,
        },
    });

    res.json(banks);
});

// app.get('/health', (_req: Request, res: Response) => {
//     res.json({ status: 'Ok' });
// });


export default app;