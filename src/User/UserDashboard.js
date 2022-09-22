import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth';
import Layout from '../core/Layout/Layout';
import { getOrderHistory } from './apiUser';

const UserDashboard = () => {
    const[history, setHistory] = useState([])
    //get user info
    const {user:{_id, name, email, role}} = isAuthenticate()
    const {token} = isAuthenticate()

    const init = (userId, token) =>{
        getOrderHistory(userId, token).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setHistory(data)
            }
        })
    }

    useEffect(()=>{
        init(_id, token)
    },[])

    //Create User Links
    const userlinks = ()=>{
        return(
            <div className="card bg-dark text-light mt-5">
                <h4 className="card-header">User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item bg-secondary">
                        <Link className='sideBarLink text-white' to='/cart'>My Cart</Link>
                        <Link className='sideBarLink text-white' to={`/user/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    }

    //User info
    const userInfo = ()=>{
        return (
            <div className="card dashBoardCard mb-5 mt-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        <strong>Name:</strong> {name}
                    </li>
                    <li className="list-group-item">
                        <strong>Email:</strong> {email}
                    </li>
                    <li className="list-group-item">
                        <strong>User Type:</strong> {role == 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = history =>{
        return(
            <div className="card dashBoardCard mb-5">
                <h3 className="card-header">Purchase History</h3>
                <ul className="ist-group">
                    <li className="list-group-item">
                        {history.map((h,i)=>{
                            return(
                                <div>
                                    <hr />
                                    <h4>Status: {h.status}</h4>
                                    <h6>Purchased Date: {moment(h.createdAt).fromNow()}</h6>
                                    {h.products.map((p,j)=>{
                                        return <div key={j}>
                                            <h6>Product Name: {p.name}</h6>
                                            <h6>Product Price: {p.price}</h6>
                                        </div>
                                    })}
                                </div>
                            )
                        })}
                    </li>
                </ul>
            </div>
        )
    }
    return (
        <Layout title="User Dashboard" description='User Dashboard'>
           <Container>
                <Row>
                    <Col md={3}>
                        {userlinks()}
                    </Col>
                    <Col md={9}>
                        {userInfo()}
                        {purchaseHistory(history)}
                    </Col>
                </Row>
           </Container>

        </Layout>
    );
};

export default UserDashboard;