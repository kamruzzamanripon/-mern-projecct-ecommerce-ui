import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { isAuthenticate } from '../../auth';
import { getProducts } from '../apiCore';
import Card from '../Card/Card';
import Layout from '../Layout/Layout';

const Home = ()=> {
    const [productBySell, setProductBySell] = useState([]);
    const [productByArrival, setProcuctByArrival] = useState([]);
    const [error, setError] = useState(false);
    

    //get new product
    const loadProductByArrival = ()=>{
        getProducts("createdAt").then((data)=>{
            if(data.error){
                setError(true)
            }else{
                setProcuctByArrival(data)
                //console.log(data)
            }
        })
    }

    //get most sole Product
    const loadProductBySell = ()=>{
        getProducts("sold").then((data)=>{
            if(data.error){
                setError(true)
            }else{
                setProductBySell(data)
            }
        })
        
    }

    //console.log("home data authentiate", isAuthenticate() )
    //console.log("home data authentiate", isAuthenticate() ? "auth hello" : "good bye")
    useEffect(()=>{
        loadProductByArrival();
        loadProductBySell();
    },[])
    return (
        <Layout title="Welcome to Click to Cart" description="this is Home Page" className="container-fluid">
            <Container>
                <h1>Best Seller</h1>
                <Row>
                    {
                        productBySell.length > 0 && productBySell.map((product, i)=>(
                            <Col md={4} className="mb-3 mt-5" key={i}>
                                <Card key={i} product={product} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>

            <Container>
                <h1>New Arrivals</h1>
                <Row>
                    {
                        productByArrival.length > 0 && productByArrival.map((product, i)=>(
                            <Col md={4} className="mb-3 mt-5" key={i}>
                                <Card key={i} product={product} />
                            </Col>
                        ))
                    }
                </Row>
            </Container>
        </Layout>
    );
}

export default Home;