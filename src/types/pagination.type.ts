import { z } from 'zod';

export const PaginationSchema = z.object({
    offset: z.number(),
    limit: z.number(),
});

export type Pagination = z.infer<typeof PaginationSchema>;