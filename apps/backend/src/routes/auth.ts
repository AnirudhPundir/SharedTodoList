import { FastifyInstance } from "fastify";
import { authController } from "../controllers/authController";

import prisma from '../../../../packages/db/prisma';

import * as bcrypt from 'bcryptjs';

import * as jwt from 'jsonwebtoken';

type AuthRequest = {
  email: string;
  password: string;
};

export default async function authRoutes(fastify: FastifyInstance) {
    // Route to generate token
    fastify.post('/token', authController.generateToken);
}
