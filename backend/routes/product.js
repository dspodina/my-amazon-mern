import express from 'express';

import productControllers from '../controllers/product.js';

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
router.post('/add-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;
