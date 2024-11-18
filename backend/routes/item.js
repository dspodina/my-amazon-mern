import express from 'express';

import itemControllers from '../controllers/item.js';

const {
    getAllItems,
    getSingleItem,
    getItemsByUser,
    createItem,
    updateItem,
    deleteItem
} = itemControllers;

const router = express.Router();

// routes
router.post('/items', getAllItems);
router.post('/items/:id', getSingleItem);
router.post('/items/user/:id', getItemsByUser);
router.post('/add-item', createItem);
router.put('/update-item/:id', updateItem);
router.delete('/delete-item/:id', deleteItem);

export default router;
