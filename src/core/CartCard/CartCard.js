import React from 'react';
import { Link } from 'react-router-dom';

const CartCard = ({
    product,
    viewProductButton= true,
    createUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined
}) => {
    return (
        <div className='card'>
            <div className="card-header cat-name">
                {product.category && product.category.name}
            </div>
            <div className="card-body">
                <span className="p_cart">{product.name} </span>
                <span className="float-right price_cart priceValue">{product.price}</span>

                <hr />
                <div className="float-right">
                    <Link to={`/product/${product._id}`}>
                        <button className="btn btn-outline-info mt-2 mb-2 ml-2">View Product</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
