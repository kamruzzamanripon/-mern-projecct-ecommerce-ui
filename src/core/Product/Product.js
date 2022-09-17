import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from "react-router";
import { getRelatedProducts, getSingleProduct } from '../apiCore';
import Card from '../Card/Card';
import Layout from '../Layout/Layout';

const Product = (props) => {
    let {productId} = useParams()

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [stateShake, setStateShake] = useState(false)
    
    const loadSingleProduct = (productId)=>{
        getSingleProduct(productId).then((data)=>{
            if(data.error){
                setError(true)
            }else{
                setProduct(data)

                //Related Product Fetch
                getRelatedProducts(data._id).then((related)=>{
                    if(related.error){
                        setError(true)
                    }else{
                        setRelatedProduct(related)
                    }
                })
            }
        })
    }
    console.log("part 041", relatedProduct)
    useEffect(()=>{
        //setProduct('ABCE')
         loadSingleProduct(productId);
        
    },[productId])
    return (
        <Layout title={product.name} description={product.description} className="container-fluid">
            <Container>
                <Row>
                    <Col md={8} className="mb-3 mt-5">
                        <Card product={product} viewProductButton={false} cssClassName="singleProduct" />
                    </Col>

                    <Col md={4} className="mb-3">
                        <h4>Related Products</h4>
                        {relatedProduct.map((p,i)=>(
                            <Card key={i} product={p} />
                        ))}
                    </Col>
                </Row>
            </Container>           
        </Layout>
            
    );
};

export default Product;