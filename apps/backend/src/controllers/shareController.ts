import prisma from "../../../../packages/db/prisma";

type ShareRequest = {
    sharedWithId: string;
};

type ShareParams = {
    taskId: string;
};

export const shareController = {    
    // Share a task with another user
    shareTask: async (request: any, reply: any) => {
        const { taskId } = request.params as ShareParams;
        const { sharedWithId } = request.body as ShareRequest;

        await prisma.sharedTask.create({
            data: { taskId, sharedWithId }
        });

        return reply.send({ message: 'Task Shared successfully' });
    }
}; 