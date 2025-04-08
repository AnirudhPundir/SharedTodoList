import { FastifyInstance } from "fastify";
import { shareController } from "../controllers/shareController";

export default async function shareRoutes(fastify: FastifyInstance) {
    // Route to share a created task with another user
    fastify.post('/tasks/:taskId/share', shareController.shareTask);
}