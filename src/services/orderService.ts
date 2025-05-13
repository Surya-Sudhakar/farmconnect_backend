import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createOrder = async (data: any, userId: string) => {
  const { productId, quantity } = data;

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error('Product not found');
  if (product.stock < quantity) throw new Error('Insufficient stock');

  await prisma.product.update({
    where: { id: productId },
    data: { stock: product.stock - quantity }
  });

  return prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
      total: quantity * product.price
    }
  });
};

export const getOrderById = async (id: string) => {
  return prisma.order.findUnique({
    where: { id },
    include: {
      product: true,
      user: true
    }
  });
};

export const getUserOrders = async (userId: string) => {
  return prisma.order.findMany({
    where: { userId },
    include: {
      product: {
        select: { name: true, price: true, imageUrl: true }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};
