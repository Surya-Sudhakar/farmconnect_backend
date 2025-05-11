import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createProduct = async (data: any, ownerId: string) => {
  return prisma.product.create({
    data: {
      ...data,
      ownerId
    }
  });
};

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: { owner: true }
  });
};

export const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: { id },
    include: { owner: true }
  });
};

export const updateProduct = async (id: string, data: any) => {
  return prisma.product.update({
    where: { id },
    data
  });
};
