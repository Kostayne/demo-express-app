import request from 'supertest';

import { app, server } from '../server';
import { testSequelize } from '../testDb';
import { todosService } from '@s/todos.service';
import { CreateTodoDto, TodoDto } from '@m/todo.model';

const testTodo: CreateTodoDto = {
    title: 'test title',
    description: 'test description',
    fulfilled: false,
};

const todoToCreate: CreateTodoDto = {
    title: 'c title',
    description: 'c description',
    fulfilled: true,
};

const updatedTodo: TodoDto = {
    id: 2,
    title: 'u title',
    description: 'u description',
    fulfilled: false,
};

beforeAll(async () => {
    await testSequelize.drop();
    await testSequelize.sync();

    // testing todo
    await todosService.create(testTodo as TodoDto);
});

afterAll(() => {
    server.close();
});

describe('Todos', () => {
    it('Get /todos returns 400 if pagination is not provided', async () => {
        const resp = await request(app).get('/api/todos');
        expect(resp.statusCode).toBe(400);
    });

    it('Get /todos returns 400 if pagination is incomplete', async () => {
        let resp = await request(app).get('/api/todos?offset=0');
        expect(resp.statusCode).toBe(400);

        resp = await request(app).get('/api/todos?limit=0');
        expect(resp.statusCode).toBe(400);
    });

    it('Get /todos returns a todos list if pagination provided', async () => {
        return request(app)
            .get('/api/todos?offset=0&limit=5')
            .expect('Content-Type', /json/) 
            .expect(200)
            .expect((res) => {
                const body = res.body as TodoDto[];
                expect(body.length).toBe(1);
                expect(body[0]).toMatchObject(testTodo);
            });
    });

    it('Get /todos returns a todo if id provided', async () => {
        return request(app)
            .get('/api/todos?id=1')
            .expect('Content-Type', /json/) 
            .expect(200)
            .expect((res) => {
                const body = res.body as TodoDto;
                expect(body).toMatchObject(testTodo);
            });
    });

    it('Get /todos returns a todo if id provided', async () => {
        return request(app)
            .get('/api/todos?id=1')
            .expect('Content-Type', /json/) 
            .expect(200)
            .expect((res) => {
                const body = res.body as TodoDto;
                expect(body).toMatchObject(testTodo);
            });
    });

    it('Post /todos returns a created todo', async () => {
        return request(app)
            .post('/api/todos')
            .send(todoToCreate)
            .expect('Content-Type', /json/) 
            .expect(200)
            .expect((res) => {
                const body = res.body as TodoDto;
                expect(body).toMatchObject({
                    id: 2,
                    ...todoToCreate,
                });
            });
    });

    it('Put /todos returns 200 if all ok', async () => {
        return request(app)
            .put('/api/todos')
            .send(updatedTodo)
            .expect(200);
    });

    it('Put /todos returns 404 if not found', async () => {
        return request(app)
            .put('/api/todos')
            .send({ ...updatedTodo, id: 8 })
            .expect(404);
    });

    it('Delete /todos returns 200 if deleted successfully', async () => {
        return request(app)
            .delete('/api/todos?id=2')
            .expect(200);
    });

    it('Delete /todos returns 404 if todo not found', async () => {
        return request(app)
            .delete('/api/todos?id=1000')
            .expect(404);
    });
});