import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await userService.register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await userService.login(req.body);
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body, req.user);
    res.status(200).json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id, req.user);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user); // ✅ no return
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getMe = async (req: express.Request, res: Response): Promise<void> => {
  console.log("📥 Entered getMe");

  try {
    console.log("🧠 Calling getUserById with:", req.user);
    const user = await userService.getUserById(req.user!.userId, req.user!);

    if (!user) {
      console.log("❌ User not found for ID:", req.user!.userId);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    console.log("✅ User found:", user);
    res.status(200).json(user);
  } catch (error: any) {
    console.error("🔥 getMe failed:", error);
    res.status(500).json({ error: error.message });
  }
};
