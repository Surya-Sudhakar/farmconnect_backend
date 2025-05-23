import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const addToCart = async (userId: string, { productId, quantity }: any) => {
  // Check if this product is already in the user's cart
  const existingItem = await prisma.cart.findFirst({
    where: { userId, productId }
  });

  if (existingItem) {
    // Update the quantity if found
    return prisma.cart.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity }
    });
  }

  // Otherwise, create a new cart item
  return prisma.cart.create({
    data: { userId, productId, quantity }
  });
};


export const getCart = async (userId: string) => {
  return prisma.cart.findMany({
    where: { userId },
    include: { product: true }
  });
};

export const removeFromCart = async (id: string) => {
  return prisma.cart.delete({ where: { id } });
};

export const checkoutCart = async (userId: string) => {
  const cartItems = await prisma.cart.findMany({ where: { userId }, include: { product: true } });

  const orders = await Promise.all(
    cartItems.map(async (item) => {
      const total = item.quantity * item.product.price;

      if (item.product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${item.product.name}`);
      }

      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: item.product.stock - item.quantity }
      });

      return prisma.order.create({
        data: {
          userId,
          productId: item.productId,
          quantity: item.quantity,
          total
        }
      });
    })
  );

  await prisma.cart.deleteMany({ where: { userId } });

  return orders;
};
