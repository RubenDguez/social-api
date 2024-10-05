import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const addThought = async (req: Request, res: Response) => {
  const { thoughtText, username } = req.body;

  if (!thoughtText || !username) return res.status(400).json({ message: 'You need to provide a thoughtText and username.' });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'No user with that username' });

    const thought = await Thought.create({ thoughtText, username });
    await User.findOneAndUpdate({ username }, { $addToSet: { thoughts: thought._id } }, { runValidators: true, new: true });

    return res.status(201).json({ thought });
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  if (!thoughtId) return res.status(400).json({ message: 'You need to provide a thoughtId.' });

  try {
    const thought = await Thought.findOne({ _id: thoughtId }).select('-__v');

    if (!thought) return res.status(404).json({ message: 'No thoughts with that ID' });

    return res.json(thought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const thought = await Thought.find();

    if (!thought.length) return res.status(404).json({ message: 'No thoughts yet in database.' });

    return res.status(200).json(thought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;

  if (!thoughtId) return res.status(400).json({ message: 'You need to provide a thoughtId.' });

  try {
    const thoughtToDelete = await Thought.findOne({ _id: thoughtId });

    if (!thoughtToDelete) return res.status(404).json({ message: 'No thought with that ID' });

    const username = thoughtToDelete.username;
    const user = await User.findOneAndUpdate({ username }, { $pull: { thoughts: thoughtId } }, { runValidators: true, new: true });

    if (!user) {
      return res.status(404).json({ message: 'No user with that username' });
    }

    const deletedThought = await Thought.deleteOne({ _id: thoughtId });

    return res.status(201).json(deletedThought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};
