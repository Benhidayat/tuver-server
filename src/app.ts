import express from 'express';
import type { Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';


import { env } from './middleware/config.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';
import verifyRouter from './modules/verify/verify.routes.js';

const app = express();

app.use(helmet());

if (env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

app.use(express.json());

// Routes
app.use('/api', verifyRouter)

app.get('/health', (_req: Request, res: Response) => {
    res.json({ status: 'Ok' });
});

// 404 handler
app.use(notFound)

// error handler
app.use(errorHandler)

export default app;