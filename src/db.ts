import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: 'test-proj',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: './data.db',
    models: [__dirname + '/models'],
    logging: false,
});