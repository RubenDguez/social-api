import { Router } from 'express';
import { addUser, getOne, getAll, updateUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';

const router = Router();

router.post('/', addUser);
router.get('/:userId', getOne);
router.get('/', getAll);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.post('/:userId/friends/:friendId', addFriend)
router.delete('/:userId/friends/:friendId', removeFriend)

export default router;
