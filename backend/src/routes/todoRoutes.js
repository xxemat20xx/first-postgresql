import express from 'express';
import { create, getAll, update, remove, getWithUsers } from '../controllers/todoController.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/with-users', getWithUsers);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;