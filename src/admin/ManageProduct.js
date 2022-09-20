import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth';
import { getProducts } from '../core/apiCore';
import Layout from '../core/Layout/Layout';
import { deleteProduct } from './apiAdmin';

const ManageProduct = ()=> {
    let [products, setProducts] = useState([]);
    
    const {user, token} = isAuthenticate();
    //console.log("mange product", products)

    //All Products
    const loadProducts = ()=>{
        getProducts().then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
    }

    //Delete Product
    const removeProduct = (id)=>{
        deleteProduct(id, user._id, token).then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                loadProducts(data)
            }
        })
    }
    
    useEffect(()=>{
        loadProducts();
    },[])

       
    return (
        <Layout description="Porducts" title="Porducts">
          <Container>
            <Row>
                <Col md={12} className="mb-3">
                    <h2 className='text-center'>Total Products: {products.length}</h2>
                    <hr />
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Product Name</th>
                                <th scope='col'>Update</th>
                                <th scope='col'>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p,i)=>(
                                <tr>
                                    <th scope='row'>{i}</th>
                                    <td><strong>{p.name}</strong></td>
                                    <td>
                                        <Link to={`/admin/product/update/${p._id}`}>
                                            <span className="badge badge-info badge-pill text-black">
                                                <FontAwesomeIcon icon={faEdit} /> Update
                                            </span>
                                        </Link>
                                    </td>
                                    <td>
                                        <span className="badge badge-danger badge-pill text-danger" onClick={()=>removeProduct(p._id)}>
                                            <FontAwesomeIcon icon={faTrash} /> Delete
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Col>
            </Row>
          </Container>
        </Layout>
    );
}

export default ManageProduct;