import Todo, { CreateTodoDto, CreateTodoSchema, TodoDto, TodoSchema } from '@m/todo.model';
import { BadRequestErr } from '@e/badRequest.error';
import { Pagination } from '@t/pagination.type';

export const todosService = {
    async create(todo: CreateTodoDto) {
        const t = CreateTodoSchema.safeParse(todo);

        if (!t.success) {
            throw new BadRequestErr(t.error.toString());
        }

        return Todo.create(todo as TodoDto);
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