import { z } from 'zod';
import { Table, Model, Column, AllowNull } from 'sequelize-typescript';

export const TodoSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    fulfilled: z.boolean(),
});

export const CreateTodoSchema = TodoSchema.omit({ id: true });

type TodoAttributes = z.infer<typeof TodoSchema>;

@Table
export default class Todo extends Model<TodoAttributes> {
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