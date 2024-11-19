import express from 'express';

import productControllers from '../controllers/product.js';
import checkUser from "../middleware/checkUser.js"

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = productControllers;

const router = express.Router();

// routes
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.post('/add-product', checkUser, createProduct);
router.put('/update-product/:id', checkUser, updateProduct);
router.delete('/delete-product/:id', checkUser, deleteProduct);

export default router;
