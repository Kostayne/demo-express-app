import { z } from 'zod';
import { Table, Model, Column, AllowNull } from 'sequelize-typescript';

export const TodoSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    fulfilled: z.boolean(),
});

export type TodoDto = z.infer<typeof TodoSchema>;
export type CreateTodoDto = Omit<TodoDto, 'id'>;
export const CreateTodoSchema = TodoSchema.omit({ id: true });

@Table
export default class Todo extends Model<TodoDto> {
    @AllowNull(false)
    @Column
    title!: string;

    @AllowNull(false)
    @Column
    description!: string;

    @AllowNull(false)
    @Column
    fulfilled!: boolean;
}