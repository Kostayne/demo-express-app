import { Request } from 'express';

import { BadRequestErr } from '@e/badRequest.error';

export function getRequestId(req: Request) {
    const id = parseInt(req.query.id as string);

    if (isNaN(id)) {
        throw new BadRequestErr('Id must be a number');
    }

    return id;
}