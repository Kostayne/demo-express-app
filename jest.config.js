/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};