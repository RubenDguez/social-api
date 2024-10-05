import { Request, Response } from 'express';
import Thought from '../models/Thoughts.js';

export const addThought = async (req: Request, res: Response) => {
  const { thoughtText, username } = req.body;

  if(!thoughtText || !username) {
    return res.status(400).json({ message: 'You need to provide a thoughtText and username.' });
  }

  try {
    const newThoughtData = await Thought.create({ thoughtText, username });
    return res.status(201).json(newThoughtData);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.userId }).select('-__v');

    if (!thought) {
      return res.status(404).json({ message: 'No thoughts with that ID' });
    }

    return res.json(thought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const thought = await Thought.find();

    if (!thought.length) {
      return res.status(404).json({ message: 'No thoughts yet in database.' });
    }

    return res.status(200).json(thought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};
