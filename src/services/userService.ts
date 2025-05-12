import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || 'secret';

export const register = async ({ name, email, password, role }: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });
};

export const login = async ({ email, password }: any) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid password');
  return jwt.sign({ userId: user.id, role: user.role }, SECRET, { expiresIn: '1d' });
};

export const updateUser = async (id: string, updateData: any, requester: any) => {
  if (id !== requester.userId && requester.role !== 'admin') {
    throw new Error('Unauthorized to update this user');
  }

  const allowedFields = ['name', 'email', 'role'];
  const filteredData: any = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: filteredData,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return updatedUser;
};

export const getUserById = async (id: string, requester: any) => {
  if (id !== requester.userId && requester.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};
