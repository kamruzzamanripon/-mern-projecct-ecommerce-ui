import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth';
import Layout from '../core/Layout/Layout';

 //get user info
 const {user:{_id, name, email, role}} = isAuthenticate()
 const {token} = isAuthenticate()

const adminLinks = ()=>{
    return(
        <div className="card">
            <h4 className="card-header bg-dark text-light">Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item bg-secondary">
                    <Link className='sideBarLink text-white' to="/admin/create/category">Create Category</Link>
                </li>
                <li className="list-group-item bg-secondary">
                    <Link className='sideBarLink text-white' to="/admin/create/product">Create Product</Link>
                </li>
                <li className="list-group-item bg-secondary">
                    <Link className='sideBarLink text-white' to="/admin/orders">View Orders</Link>
                </li>
                <li className="list-group-item bg-secondary">
                    <Link className='sideBarLink text-white' to="/admin/products">Manage Products</Link>
                </li>
            </ul>
        </div>
    )
}


//User adminInfo
const adminInfo = ()=>{
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

const AdminDashboard = () => {
    return (
        <Layout>
            <Container>
                <Row>
                    <Col md={3}>
                        {adminLinks()}
                    </Col>

                    <Col md={9}>
                        {adminInfo()}
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default AdminDashboard;