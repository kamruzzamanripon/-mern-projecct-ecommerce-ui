import moment from 'moment';
import React from 'react';

//css
//import './card.css'

const Card = ({
    product,
    viewProductButton= true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false,
    setRun = (f)=> f,
    run= undefined,
    cssClassName = ''
})=> {
    return (
        <div className='card'>
            <div className="card-header cat-name">{product.category && product.category.name}</div>
            <div className="card-body">
                <p className='p_name'>{product.name}</p>
                <p className='price'> &#2547; {product.price} </p>

                <hr />
                <p>
                   Last Update: { moment(product.createdAt).fromNow()}
                </p>

                {showAddToCartButton && (
                    <button className='btn btn-outline-warning mt-2 mb-2 ml-2 mr-2'>
                        Add to Cart
                    </button>
                )}

                
                {viewProductButton && (
                    <button className='btn btn-outline-info mt-2 mb-2 ml-2 mr-2'>
                        Add to Cart
                    </button>
                )}
               
            </div>
        </div>
    );
}

export default Card;