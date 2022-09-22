import DropIn from 'braintree-web-drop-in-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../../auth/index';
import { createOrder, getBraintreeClientToken, processPayment } from '../apiCore';
import { emptyCart } from '../cartHelpers';

const Checkout = ({ products, setRun = (f) =>f, run= undefined}) => {
    //get total price
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: "",
        loading: false,
    })

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;

    const getToken = (userId, token) =>{
        getBraintreeClientToken(userId, token).then((data)=>{
            if(data.error){
                setData({
                    ...data,
                    error: data.error
                })
            }else{
                setData({ clientToken: data.clientToken })
            }
        })
    }

    useEffect(()=>{
        getToken(userId, token)
    },[])

    const getTotal = (event) =>{
        setData({...data, address: event.target.value})
    }

    const handelAddress = (event)=>{
        setData({...data, address: event.target.value})
    }

    let delivery = data.address;

    const buy = ()=>{
        setData({loading: true});
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data=>{
            nonce = data.nonce;

            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getTotal()
            }

            //api Call
            processPayment(userId, token, paymentData).then((response)=>{
                const orderData = {
                    products: products,
                    transaction_id : response.transaction.id,
                    amount: response.transaction.amount,
                    address: delivery
                }

                //Order Create
                createOrder(userId, token, orderData).then((ord)=>{
                    emptyCart(()=>{
                        setRun(!run)
                        setData({loading: false, success: true})
                    })
                }).catch((orderErr)=>{
                    console.log(orderErr)
                })
            })
        }).catch(error=>{
            setData({...data, error: error.message})
        })
    }

    const showDropIn = ()=>{
        return <div>
            {data.clientToken != null && products.length > 0 ? ( 
                <div>
                    <div className="form-group mb-3">
                        <h4 className="text-muted">Delivery Address</h4>
                        <textarea onChange={handelAddress} className='form-control' value={data.address} placeholder="Enter your Delivery Address" />
                    </div>
                    <DropIn options={{ authorization : data.clientToken }} onInstance={(instance)=> data.instance = instance} />
                    <button className="btn btn-success btn-block" onClick={buy} >Pay</button>
                </div>
            ) : null}
        </div>
    }

    const showCheckout = ()=>{
        return isAuthenticate() ? (<div>{showDropIn()}</div>) : ( <Link to='/signin'><button className="btn btn-primary">Sign in to Checkout</button></Link>)
    }

    const showSuccess = (success) =>{
        return (
            <div className="alert alert-info" style={{ display: success ? "" : "none"}}>
                <p>Thanks! your Payment was Successfull</p>
            </div>
        )
    }

    const showError = (error) =>{
        return (
            <div className="alert alert-danger" style={{ display: error ? "" : "none"}}>
                {error}
            </div>
        )
    }

    const showLoading = (loading)=>{
        return loading && <h2>Loading...</h2>
    }
    return (
        <div>
            {showError(data.error)}
            {showSuccess(data.success)}
            {showLoading(data.loading)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;