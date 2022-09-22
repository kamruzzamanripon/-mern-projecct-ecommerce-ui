import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { isAuthenticate } from '../auth';
import Layout from '../core/Layout/Layout';
import { getOrderList, getStatusValues, updateOrderStatus } from './apiAdmin';

const Order = () => {
    //state
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    //get user info
    const {user, token} = isAuthenticate();

    //load orders
    const loadOrders = ()=>{
        getOrderList(user._id, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else {
                setOrders(data)
            }
        })
    }

    //load status
    const loadStatus = ()=>{
        getStatusValues(user._id, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else {
                setStatusValues(data)
            }
        })
    }

    //load all data
    useEffect(()=>{
        loadOrders();
        loadStatus();
    },[])

    //Show total Orders
    const showTotalOrders = ()=>{
        if(orders.length){
            return <h2 className='text-danger'>Total Order: {orders.length}</h2>
        }else{
            return <h2 className='text-danger'>No Orders Found</h2>
        }
    }

    //update Status
    const handelChange = (e, orderId)=>{
        updateOrderStatus(user._id, token, orderId, e.target.value).then((data)=>{
            if(data.error){
                console.log(data.error)
            }else{
                loadOrders();
            }
        })
    }

    //Show Status
    const showStatus = (order)=>{
        return (
            <div className="form-group">
                <h3 className="mark mb-4">Status: {order.status}</h3>
                <select className='form-control' onChange={(e)=> handelChange(e, order._id)}>
                    <option>Update Status</option>
                    {statusValues.map((status, index)=>(<option key={`status_${index}`}>{status}</option>))}
                </select>
            </div>
        )
    }

    //Show Products Details
    const showProductsDetails = (key, value)=>{
        return <div className="input-group mb-2 mr-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text"><strong>{key}</strong></div>
                <input type="text" className="form-control" value={value} readOnly />
            </div>
        </div>
    }
    return (
        <Layout>
            <Container>
                <Row>
                    <Col>
                    {showTotalOrders()}
                    </Col>
                </Row>
            </Container>

            {orders.map((order, orderIndex)=>{
                return (
                    <Container>
                        <Row>
                            <Col md={6}>
                                <div className="mt-g" key={orderIndex}>
                                    <h1><span>Order Id: <span className="orderId">{order._id}</span></span></h1>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">Show Status- {showStatus()}</li>
                                        <li className="list-group-item">
                                            <strong>Transaction ID: </strong> {order.transaction_id}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Amount: </strong> {order.amount}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Order By: </strong> {order.user.name}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Order Place: </strong> {moment(order.createdAt).fromNow()}
                                        </li>
                                        <li className="list-group-item">
                                            <strong>Delivery Address: </strong> {order.address}
                                        </li>
                                    </ul>
                                </div>
                            </Col>

                            <Col md={6}>
                                <h3 className="mt-4 mb-4">Total Products in the Order: {order.products.lenght}</h3>

                                {order.products.map((product, productIndex)=>(
                                    <div className='mb-4' key={`p_${productIndex}`} style={{ padding:"20px", border: "1px solid indigo" }}>
                                        {showProductsDetails("Product Name", product.name)}
                                        {showProductsDetails("Product Price", product.price)}
                                        {showProductsDetails("Total Product", product.count)}
                                        {showProductsDetails("Product Id", product._id)}
                                        
                                    </div>
                                ))}
                            </Col>
                        </Row>
                    </Container>
                )
            })}
        </Layout>
    );
};

export default Order;