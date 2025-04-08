import prisma from "../../../../packages/db/prisma";

// Types
type TaskRequest = {
    title: string;
    description?: string;
    userId: string;
};

type GetTypesRequest = {
    userId: string;
};

type TaskParams = {
    taskId: string;
};

export const taskController = {
    // Create a new task
    createTask: async (request: any, reply: any) => {
        const { title, description, userId } = request.body as TaskRequest;
        const task = await prisma.task.create({ data: { title, description, userId } });
        return reply.send(task);
    },

    // Get all tasks for a user
    getTasks: async (request: any, reply: any) => {
        const { userId } = request.body as GetTypesRequest;
        const tasks = await prisma.task.findMany({
            where: { userId }
        });
        return reply.send(tasks);
    },

    // Update a task
    updateTask: async (request: any, reply: any) => {
        const { taskId } = request.params as TaskParams;
        const { title, description } = request.body as TaskRequest;

        const updatedTask = await prisma.task.update({
            where: { taskId },
            data: { title, description }
        });

        return reply.send(updatedTask);
    },

    // Delete a task
    deleteTask: async (request: any, reply: any) => {
        const { taskId } = request.params as TaskParams;
        await prisma.task.delete({ where: { taskId } });
        return reply.send({ message: 'Task Deleted' });
    },

    // Get tasks shared with user
    getSharedTasks: async (request: any, reply: any) => {
        const { userId } = request.body as GetTypesRequest;
        const tasks = await prisma.task.findMany({
            where: { shareWith: userId }
        });
        return reply.send(tasks);
    }
}; 