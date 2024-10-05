import { Request, Response } from 'express';
import Thought from '../models/Thoughts.js';

export const addUser = async (req: Request, res: Response) => {
    try {
      const newThoughtData = await Thought.create(req.body);
      return res.status(201).json(newThoughtData);
    } catch (error) {
      const ERROR = error as Error;
      return res.status(500).json(ERROR.message);
    }
  };

export const getOne = async (req: Request, res: Response) => {
  try {
    const user = await Thought.findOne({ _id: req.params.userId }).select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No thoughts with that ID' });
    }

    return res.json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await Thought.find();

    if (!users) {
      return res.status(404).json({ message: 'No thoughts yet in database.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};
