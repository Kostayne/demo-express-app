import { Router } from 'express';

import { NotFoundErr } from '@e/notFound.error';
import { todosService } from '@s/todos.service';
import { getRequestId } from 'utils/getRequestId';
import { getRequestPagination } from 'utils/getRequestPagination';

export const todosRouter = Router();

todosRouter.get('/', async (req, res) => {
    if (req.query.id) {
        const id = getRequestId(req);
        const todo = await todosService.getOne(id);

        if (!todo) {
            throw new NotFoundErr();
        }

        return res.json(todo);
    }

    const pagination = getRequestPagination(req);
    const todos = await todosService.getMany(pagination);
    return res.json(todos);
});

todosRouter.post('/', async (req, res) => {
    const newTodo = await todosService.create(req.body);
    return res.json(newTodo);
});

todosRouter.put('/', async (req, res) => {
    const updatedCount = await todosService.update(req.body);

    if (updatedCount[0] === 0) {
        throw new NotFoundErr();
    }

    return res.sendStatus(200);
});

todosRouter.delete('/', async (req, res) => {
    const deletedCount = await todosService.delete(getRequestId(req));

    if (deletedCount === 0) {
        throw new NotFoundErr();
    }

    return res.sendStatus(200);
});