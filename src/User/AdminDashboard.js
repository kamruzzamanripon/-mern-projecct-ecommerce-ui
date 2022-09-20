import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout/Layout';

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

const adminInfo = ()=>{
    return(
        <div>User info goes here</div>
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