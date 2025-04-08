import { FastifyInstance } from "fastify";
import { taskController } from "../controllers/taskController";

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
    fastify.post('/tasks', taskController.createTask);

    //route to get all tasks
    fastify.get('/tasks', taskController.getTasks);

    //route to update a task
    fastify.put('/tasks/:taskId', taskController.updateTask);

    //route to delete a task
    fastify.delete('/tasks/:taskId', taskController.deleteTask);

    //route to fetch all the task shared with the user
    fastify.get('/shared-tasks', taskController.getSharedTasks);
}