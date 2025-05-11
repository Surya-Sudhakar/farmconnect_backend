import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async ({ productId, quantity }: any, userId: string) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Product not found');
  if (product.stock < quantity) throw new Error('Not enough stock');

  const total = product.price * quantity;

  await prisma.product.update({
    where: { id: productId },
    data: { stock: product.stock - quantity }
  });

  return prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
      total
    }
  });
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      product: true
    }
  });
};

export const getUserOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: { product: true }
  });
};
