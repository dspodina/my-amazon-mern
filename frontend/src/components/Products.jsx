import { useState, useEffect } from 'react';
import axios from 'axios';

import './Products.css';
import Loading from './Loading';
import Product from './Product';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/products`
                );
                if (res.status === 200) {
                    setProducts(res.data);
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    return (
        <div className="products">
            {loading && <Loading />}
            {products.length > 0 ? (
                <div>
                    {products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="no-product">No products found</div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Products;

