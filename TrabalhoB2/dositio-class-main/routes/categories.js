/** @type{import('fastify').FastifyPluginAsync<>} */
import createError from '@fastify/error';
export default async function categories(app, options) {
    const InvalidProductError = createError('InvalidProductError', 'Produto Inválido.', 400);

    const categories = app.mongo.db.collection('categories');
    const products = app.mongo.db.collection('products');

    app.get('/categories', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await categories.find().toArray();
        }
    );

    app.post('/categories', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: {type: 'integer'},
                    name: {type: 'string'},
                    img_url: {type: 'string', format: 'uri'}
                },
                required: ['name', 'img_url']
            }
        },
        config: {
            requireAuthntication: true
        }
    }, async (request, reply) => {
        let category = request.body;

        await categories.insertOne(category);

        // created
        return reply.code(201).send();
    });

    app.put('categories/:id', {
        config: {
            requireAuthntication: true
        }
    }, async (request, reply) => {
        let id = request.params.id;
        let category = request.body;

        await categories.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set: {
                name: category.name,
                img_url: category.img_url
            }
        });

        // no content
        return reply.code(204).send();
    });

    app.delete('/categories/:id', {
        config: {
            requireAuthntication: true
        }
    }, async (request, reply) => {
        let id = request.params.id;

        await categories.deleteOne({_id: new app.mongo.ObjectId(id)});

        // no content
        return reply.code(204).send();
    });

    app.get('/categories/:id/:products', async (request, reply) => {
        let id =  request.params.id;
        
        const category = await categories.findOne({_id: new app.mongo.ObjectId(id)});

        if (!category) {
            return reply.code(404).send({ message: 'Categoria não encontrada' });
        }

        return await products.find().toArray();

    });

}