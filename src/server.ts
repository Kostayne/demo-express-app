import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

import { sequelize } from './db';
import { todosRouter } from '@r/todos.router';
import { errorMiddleware } from '@middleware/error.middleware';

export const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('It works!');
});

app.use('/api/todos', todosRouter);

app.use(errorMiddleware);

const port = process.env.DEMO_EXPRESS_APP_PORT || 3015;

export const server = app.listen(port, async () => {
    if (process.env.NODE_ENV === 'development') {
        await sequelize.sync();
    }

    console.log(`Listening on ${port}`);
});