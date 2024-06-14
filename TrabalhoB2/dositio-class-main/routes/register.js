/** @type{import('fastify').FastifyPluginAsync<>} */
export default async function register(app, options) {
    
    const register = app.mongo.db.collection('register');

    app.get('/register', 
        {
            config: {
                logMe: true
            }
        }, 
        async (request, reply) => {
            return await register.find().toArray();
        }
    );

    app.post('/register', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    password: { type: 'string' }
                },
                required: ['name', 'password']
            }
        },
        config: {
            requireAuthentication: true
        }
    }, async (request, reply) => {
        let regist = request.body;
        
        await register.insertOne(regist);

        return reply.code(201).send();
    });
    
}