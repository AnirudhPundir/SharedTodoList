import { FastifyInstance } from "fastify";
import prisma from "../../../../packages/db/prisma";

export default async function shareRoutes(fastify: FastifyInstance) {
    
    //route to share a created task with another user
    fastify.post('tasks/:taskId/share', async(request, reply) => {
        const {taskId} = request.params as {taskId: string}

       const {sharedWithId} = request.body as {sharedWithId: string} 

       await prisma.sharedTask.create({data: {taskId, sharedWithId}})

       return reply.send({message: 'Task Shared successfully'})
    });
}