import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { createServer } from 'http';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

const app = express();
const httpServer = createServer(app);

app.use(helmet());
app.use(hpp());

app.use(router);

app.use((req: Request, res: Response) => {
    return res.status(404).json({
        error: 'Not Found',
        reasons: [
            {
                reason: 'invalid_path',
                message: 'The requested path could not be found',
                data: req.path,
                location: 'path',
            },
        ],
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    // I'd normally use a logger here or something better than just a simple log
    console.error(err.message);

    return res.status(500).json({
        status: 'error',
        message: `Internal server error!`,
    });
});

export { app, httpServer };
