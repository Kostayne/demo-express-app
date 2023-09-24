import { NextFunction, Request, Response } from 'express';

import { ServerErr } from '@e/server.error';

export function errorMiddleware(err: Error, _req: Request, res: Response, next: NextFunction) {

    if (err) {
        if (err instanceof ServerErr) {
            return res.status(err.code).send(err.message);
        }

        return res.status(500).send(err.message);
    }

    next();
}