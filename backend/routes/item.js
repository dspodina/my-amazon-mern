import express from 'express';

import itemControllers from '../controllers/item.js';
import verifyToken from '../middleware/verifyToken.js';

const { getItemsByUser, createItem, updateItem, deleteItem } = itemControllers;

const router = express.Router();

// routes
router.post('/items/user/:id', verifyToken, getItemsByUser);
router.post('/add-item', verifyToken, createItem);
router.put('/update-item/:id', verifyToken, updateItem);
router.delete('/delete-item/:id', verifyToken, deleteItem);

export default router;
