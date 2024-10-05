import { Request, Response } from 'express';
import { User } from '../models/index.js';

export const addUser = async (req: Request, res: Response) => {
  const { username, email } = req.body;

  if (!username || !email) return res.status(400).json({ message: 'You need to provide a username and email.' });

  try {
    const newUser = await User.create({ username, email });
    return res.status(201).json(newUser);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getOne = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: 'You need to provide a userId.' });

  try {
    const user = await User.findOne({ _id: userId }).select('-__v');

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    return res.json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users.length) return res.status(404).json({ message: 'No users yet in database.' });

    return res.status(200).json(users);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email } = req.body;

  if (!userId || !email) return res.status(400).json({ message: 'You need to provide a userId and email.' });

  const filter = { _id: userId };
  const update = { email };

  try {
    const user = await User.updateOne(filter, update, { runValidators: true, new: true });

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    return res.status(201).json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userId) return res.status(400).json({ message: 'You need to provide a userId.' });

  const filter = { _id: userId };

  try {
    const user = await User.deleteOne(filter);

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    return res.status(201).json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  if (userId === friendId) return res.status(401).json({ message: 'you should not befriend yourself, nice try.' });

  try {
    const filter = { _id: userId };
    const user = await User.findOneAndUpdate(filter, { $addToSet: { friends: friendId } }, { runValidators: true, new: true });

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    return res.status(201).json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  if (userId === friendId) return res.status(401).json({ message: 'you should not remove yourself as friend, nice try.' });

  try {
    const filter = { _id: userId };
    const user = await User.findOneAndUpdate(filter, { $pull: { friends: friendId } }, { runValidators: true, new: true });

    if (!user) return res.status(404).json({ message: 'No user with that ID' });

    return res.status(201).json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};
