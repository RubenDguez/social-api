import { Request, Response } from 'express';
import User from '../models/User.js';

export const addUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId }).select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    return res.json(user);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users.length) {
      return res.status(404).json({ message: 'No users yet in database.' });
    }

    return res.status(200).json(users);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const filter = { _id: req.params.userId };
  const update = { email };

  try {
    const userToUpdate = await User.findOne(filter);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    const updatedUser = await User.updateOne(filter, update);

    return res.status(201).json(updatedUser);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const filter = { _id: req.params.userId };

  try {
    const userToDelete = await User.findOne(filter);

    if (!userToDelete) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    const deletedUser = await User.deleteOne(filter);
    return res.status(201).json(deletedUser);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const addFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  if (userId === friendId) {
    return res.status(401).json({ message: 'you should not befriend yourself, nice try.' });
  }

  try {
    const filter = { _id: userId };
    const userToUpdate = await User.findOne(filter);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Avoiding duplicate friends
    const friendArray = Array.from(new Set([...userToUpdate.friends.map((f) => `${f}`), friendId]));
    const updatedUser = await User.updateOne(filter, { friends: friendArray });

    return res.status(201).json(updatedUser);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};

export const removeFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  if (userId === friendId) {
    return res.status(401).json({ message: 'you should not remove yourself as friend, nice try.' });
  }

  try {
    const filter = { _id: userId };
    const userToUpdate = await User.findOne(filter);

    if (!userToUpdate) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    // Avoiding duplicate friends
    const friendArray = Array.from(new Set([...userToUpdate.friends.map((f) => `${f}`).filter((filter) => filter !== friendId)]));
    const updatedUser = await User.updateOne(filter, { friends: friendArray });

    return res.status(201).json(updatedUser);
  } catch (error) {
    const ERROR = error as Error;
    return res.status(500).json(ERROR.message);
  }
};
