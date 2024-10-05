import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

export const addReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    const thought = await Thought.findOneAndUpdate({ _id: thoughtId }, { $addToSet: { reactions: { reactionBody, username } } }, { runValidators: true, new: true });

    if (!thought) return res.status(404).json({ message: 'No thought with that ID' });

    return res.status(201).json(thought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const thought = await Thought.findOneAndUpdate({ _id: thoughtId }, { $pull: { reactions: { _id: reactionId } } }, { runValidators: true, new: true });

    if (!thought) return res.status(404).json({ message: 'No thought with that ID' });

    return res.status(200).json(thought);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};
