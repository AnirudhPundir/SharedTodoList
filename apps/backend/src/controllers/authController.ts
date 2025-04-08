import prisma from "../../../../packages/db/prisma";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

type AuthRequest = {
    email: string;
    password: string;
};

export const authController = {
    // Generate JWT token
    generateToken: async (request: any, reply: any) => {
        const { email, password } = request.body as AuthRequest;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return reply.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return reply.send({ token });
    }
}; 