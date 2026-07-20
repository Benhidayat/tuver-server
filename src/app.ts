import express from 'express';

import { requestLogger } from './utils/middleware.js';

const app = express();

app.use(requestLogger);

app.get('/', (_req, res) => {
    res.send('Hello world');
    console.log('Response sent')
});

export default app;