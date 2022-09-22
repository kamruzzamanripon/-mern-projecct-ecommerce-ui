import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartCard from '../CartCard/CartCard';
import { getCart } from '../cartHelpers';
import Checkout from '../Checkout/Checkout';
import Layout from '../Layout/Layout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    //get Total
    const getTotal = ()=>{
        return items.reduce((currentValue, nextValue)=>{
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    //show items
    const showItems = item =>{
        return(
            <div>
                <h2>Your Cart has {items.length} itmes</h2>
                <h2>Total: <span> &#2547; {getTotal()}</span></h2>
                <hr />
                {
                    items.map((product, i)=>(
                        <CartCard 
                            key={i} 
                            product={product} 
                            showRemoveProductButton={true} 
                            setRun={setRun}
                            run={run} 
                            cartUpdate={true}
                        />
                    ))
                }
            </div>
        )
    }

    //no item show 
    const noItemsMessage = ()=>{
        return (
            <h2 id="darkblue">
            Your Cart is Empty <br />
            <Link to="/shop">Continue Shopping</Link>
        </h2>
        )
    }

    useEffect(()=>{
        setItems(getCart())
    },[run])
    return (
        <Layout title="cart" description='Manage your cart' className="container-fluid">
            <Container>
                <Row>
                    <div className="col-6">
                        {items.length > 0 ? showItems(items) : noItemsMessage() }
                    </div>
                    <div className="col-6">
                        <h2>Select your Payment Method</h2>
                        <Checkout 
                            products={items}
                            setRun={setRun}
                            run={run}
                        />
                    </div>
                </Row>
            </Container>
        </Layout>
    );
};

export default Cart;