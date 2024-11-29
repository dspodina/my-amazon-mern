import PropTypes from 'prop-types';
import './Product.css';

const Product = ({ product }) => {
    return (
        <div className="product-card">
            <div className="image-container">
                <p className="product-category">{product.category}</p>
                <img
                    src={product.image}
                    alt={product.title}
                    className="product-image"
                />
            </div>
            <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price"> ${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

Product.propTypes = {
    product: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired
};

export default Product;
