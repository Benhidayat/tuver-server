import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from './db/prisma.ts';
import morgan from 'morgan';

import notFound from './middleware/notFound.ts';
import errorHandler from './middleware/errorHandler.ts';

const app = express();

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(morgan('dev'));
} else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(morgan('combined'));
}
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

// error handler
app.use(errorHandler)

export default app;