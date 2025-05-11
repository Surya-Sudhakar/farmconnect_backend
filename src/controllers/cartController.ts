import { Request, Response } from 'express';
import * as cartService from '../services/cartService';

export const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const cartItem = await cartService.addToCart(userId, req.body);
    res.status(201).json(cartItem);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const cart = await cartService.getCart(userId);
    res.status(200).json(cart);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromCart = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    await cartService.removeFromCart(itemId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const orders = await cartService.checkoutCart(userId);
    res.status(200).json({ message: 'Order placed successfully', orders });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
