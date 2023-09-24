import Todo, { CreateTodoSchema, TodoSchema } from '@m/todo.model';
import { BadRequestErr } from '@e/badRequest.error';
import { Pagination } from '@t/pagination.type';

export const todosService = {
    async create(todo: Required<Todo>) {
        const t = CreateTodoSchema.safeParse(todo);

        if (!t.success) {
            throw new BadRequestErr(t.error.toString());
        }

        return Todo.create(todo);
    },

    async getOne(id: number) {
        return Todo.findOne({
            where: {
                id,
            },
        });
    },

    async getMany({ offset, limit }: Pagination) {
        return Todo.findAll({
            offset, limit,
        });
    },

    async update(todo: Todo) {
        const t = TodoSchema.safeParse(todo);

        if (!t.success) {
            throw new BadRequestErr(t.error.toString());
        }

        return Todo.update(t.data, {
            where: {
                id: todo.id,
            },
        });
    },

    async delete(id: number) {
        return Todo.destroy({
            where: {
                id,
            },
        });
    },
};