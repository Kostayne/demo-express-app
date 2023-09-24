import { Request } from 'express';

import { Pagination } from '@t/pagination.type';
import { BadRequestErr } from '@e/badRequest.error';

export function getRequestPagination(req: Request): Pagination {
    const q = req.query as Record<string, string>;

    if (!q.offset || !q.limit) {
        throw new BadRequestErr('Query params must contain offset & limit');
    }
    
    const nums = [q.offset, q.limit].map(s => parseInt(s));
    
    if (nums.some(n => isNaN(n))) {
        throw new BadRequestErr('Offset & limit must be typeof number!');
    }

    if (nums.some(n => n < 0)) {
        throw new BadRequestErr('Offset & limit must be positive!');
    }

    return {
        offset: nums[0],
        limit: nums[1],
    };
}