import { Sequelize } from 'sequelize-typescript';

export const testSequelize = new Sequelize({
    database: ':demo_express_app_test:',
    dialect: 'sqlite',
    username: 'root',
    password: '',
    storage: ':memory:',
    models: [__dirname + '/models'],
    logging: false,
});