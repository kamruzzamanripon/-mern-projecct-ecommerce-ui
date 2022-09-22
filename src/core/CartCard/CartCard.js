import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { removeItem, updateItem } from '../cartHelpers';

const CartCard = ({
    product,
    viewProductButton= true,
    createUpdate = false,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined,
    cartUpdate=false
}) => {

const [count, setCount] = useState(product.count)

//Delete Cat Item
const showRemoveButton = (showRemoveProductButton) =>{
    return showRemoveButton && (
        <button
            onClick={()=>{
                removeItem(product._id);
                setRun(!run)
            }}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    )
}

const handelChange = (productId) => event => {
    setRun(!run)
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if(event.target.value >= 1){
        updateItem(productId, event.target.value)
    }
}

//update Cart Item
const showCartUpdateOptions = (cartUpdate)=>{
    return cartUpdate && (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust Quantity</span>
                </div>
                <input type="number" className='from-control' id='adjust' value={count} onChange={handelChange(product._id)} />
            </div>
        </div>
    )
}

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

                    {showRemoveButton(showRemoveProductButton)}
                </div>

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default CartCard;
