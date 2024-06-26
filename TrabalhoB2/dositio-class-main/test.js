import { test, describe } from 'node:test';
import { equal, deepEqual } from 'node:assert';
import { build, options } from './app.js';

describe('###Tests for Server Configuration', async(t) => {
    test('Testing options configuration file', async (t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });

        deepEqual(options.stage, 'test');
        deepEqual(options.port, '3000');
        deepEqual(options.host, '127.0.0.1');
        deepEqual(options.jwt_secret, 'Abcd@1234');
        deepEqual(options.db_url, 'mongodb://localhost:27017/dositio');
    });
});

describe('###Tests for Unauthenticated Routes', async(t) => {
    
    describe('##Success Requests', async(t) => {
        test('# GET /products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/products'
            });

            equal(response.statusCode, 200);
        });

        //testes para as rotas implementadas no 'Trabalho_1'
        test('# GET /categories', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /categories/:id/:products', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/categories/:id/:products'
            });

            equal(response.statusCode, 200);
        });

        test('# GET /register', async(t) => {
            const app = await build(options);

            t.after(async() => {
                await app.close();
            });
            const response = await app.inject({
                method: 'GET',
                url: '/register'
            });

            equal(response.statusCode, 200);
        });

    });

    describe('##Bad Requests', async(t) => {

    });
});

describe('###Tests for Authenticated routes', async(t) => {

    test('# POST /categories', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/categories'
        });

        equal(response.statusCode, 200);
    });

    test('# PUT /categories/:id', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'PUT',
            url: '/categories/:id'
        });

        equal(response.statusCode, 200);
    });

    test('# DELETE /categories/:id', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'DELETE',
            url: '/categories/:id' 
        });

        equal(response.statusCode, 200);
    });

    test('# POST /register', async(t) => {
        const app = await build(options);

        t.after(async() => {
            await app.close();
        });
        const response = await app.inject({
            method: 'POST',
            url: '/register' 
        });

        equal(response.statusCode, 200);
    });
});