import PropTypes from 'prop-types';

import './Product.css';

const Product = ({ product }) => {
    return (
        <div className="product">
            <div className="image-container ">
                <img src={product.image} alt={product.title} />
            </div>
            <div className='product-info'>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>{product.category}</p>
                <p>${product.price}</p>
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
    })
};

export default Product;
