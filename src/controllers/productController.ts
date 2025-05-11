import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, category, imageUrl, stock } = req.body;
    const ownerId = (req as any).user.userId;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        category,
        imageUrl,
        stock,
        ownerId
      }
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id }
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, category, imageUrl, stock } = req.body;

    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: { name, price, category, imageUrl, stock }
    });

    res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
