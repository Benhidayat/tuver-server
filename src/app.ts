import express from 'express';
import type { Request, Response } from 'express';
import { requestLogger } from './middleware/middleware.ts';
import { prisma } from './db/prisma.ts'

import notFound from './middleware/notFound.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();

app.use(requestLogger);

app.use(express.json());

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


// 404 handler
app.use(notFound)

export default app;