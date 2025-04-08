import { FastifyInstance } from "fastify";

import prisma from "../../../../packages/db/prisma"; 


//Types
type TaskRequest = {
    title: string;
    description?: string;
    userId: string;
  };

type GetTypesRequest = {
    userId: string
}

type TaskParams = {
    taskId: string
}


export default async function taskRoutes(fastify: FastifyInstance){

    //route to create a task
    fastify.post('/tasks', async (request, reply) => {
        const {title, description, userId} = request.body as TaskRequest

        const task = await prisma.task.create({data: {title, description, userId}});

        return reply.send(task)
    });


    //route to get all tasks
    fastify.get('/tasks', async(request, reply) => {
        const {userId} = request.body as GetTypesRequest;

        const tasks = await prisma.task.findMany({
            where: {userId}
        });

        return reply.send(tasks)
    });

    //route to update a task
    fastify.put('/tasks/:taskId', async(request, reply) => {
        const {taskId } = request.params as TaskParams;

        const {title, description} = request.body as TaskRequest;

        const updatedTask = await prisma.task.update({
            where: {taskId},
            data: { title, description}
        });

        return reply.send(updatedTask)
    });

    //route to delete a task
    fastify.delete('/tasks/:taskId', async(request, reply) => {
        const {taskId } = request.params as TaskParams;

        await prisma.task.delete({where : taskId})

        return reply.send({message: 'Task Deleted'})
    });

    //route to fetch all the task shared with the user
    fastify.get('/tasks', async(request, reply) => {
        const {userId} = request.body as GetTypesRequest;

        const tasks = await prisma.task.findMany({
            where: {shareWith: userId}
        });

        return reply.send(tasks)
    });
}