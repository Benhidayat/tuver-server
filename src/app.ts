import express from 'express';
import type { Request, Response } from 'express';
import { prisma } from './db/prisma.js';
import morgan from 'morgan';
import { env } from './middleware/config.js';

import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

if (env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
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