import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';

import { sequelize } from './db';
import { todosRouter } from '@r/todos.router';
import { errorMiddleware } from '@middleware/error.middleware';

const app = express();
const port = process.env.DEMO_EXPRESS_APP_PORT || 3015;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (_, res) => {
    res.send('It works!');
});

app.use('/api/todos', todosRouter);

app.use(errorMiddleware);

app.listen(port, async () => {
    await sequelize.sync();
    console.log(`Listening on ${port}`);
});