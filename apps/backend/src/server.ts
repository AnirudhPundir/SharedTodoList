import Fastify from 'fastify'
import taskRoutes from './routes/task';
import shareRoutes from './routes/share';

const server = Fastify();

//register created routes
server.register(taskRoutes);
server.register(shareRoutes);

server.get('/', async() => {
    return {'message': "Health Check status"}
});

server.listen({port: 3000}, () => {
    console.log('Server is running on 3000')
});