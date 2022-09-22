import { faCartPlus, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addItem } from '../cartHelpers';
import ShowImage from '../ShowImage/ShowImage';

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
    const [redirect, setRedirect] = useState()
    const navigate = useNavigate()

    const shouldRedirect = (redirect) =>{
        if(redirect){
            navigate("/cart");
        }
    }

    const addToCart =()=>{
        addItem(product, ()=>{
            setRedirect(true)
        })
    }

    return (
        <div className='card'>
            {shouldRedirect(redirect)}
            <div className="card-header cat-name">{product.category && product.category.name}</div>
            <div className="card-body">

                { product.quantity > 0 ? 
                (<span className='badge badge-success badge-pill float-right'> {product.quantity}</span>) : 
                (<span className='badge badge-danger badge-pill float-right'> Out of Stock</span>)}
                <br />
                <ShowImage cssClassName={cssClassName} url="product" item={product} />
                    
                <p className='p_name'>{product.name}</p>
                <p className='price'> &#2547; {product.price} </p>

                <hr />
                <p>
                   Last Update: { moment(product.createdAt).fromNow()}
                </p>

                {showAddToCartButton && (
                    <button className='btn btn-outline-warning mt-2 mb-2 ml-2 mr-2' onClick={addToCart}>
                        Add to Cart <FontAwesomeIcon icon={faCartPlus} />
                    </button>
                )}

                
                <Link to={`/product/${product._id}`}>
                {viewProductButton && (
                    <button className='btn btn-outline-info mt-2 mb-2 ml-2 mr-2'>
                       View Product <FontAwesomeIcon icon={faEye} />
                    </button>
                )}
                </Link>
               
            </div>
        </div>
    );
}

export default Card;