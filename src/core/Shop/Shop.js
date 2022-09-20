import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getCategory, getFilterProduct } from '../apiCore';
import Card from '../Card/Card';
import Checkbox from '../Checkbox/Checkbox';
import { prices } from '../fixedPrice';
import Layout from '../Layout/Layout';
import RadioBox from '../RadioBox/RadioBox';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [myFilter, setMyFilter] = useState({
        filter:{
            category: [],
            price: []
        }
    })
    const [error, setError] = useState(false);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [limit, setLimit] = useState(6);
    const [result, setResult] = useState([]);

    //load all Categories
    const loadCategories = ()=>{
        getCategory().then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setCategories((categories)=> data)
            }
        })
    }

    //Load filter Product 
    const loadFilterResult = ()=>{

        getFilterProduct(skip, limit, myFilter).then((data)=>{
            if(data.error){
                setError(data.error);
            }else{
                setResult(data.data);
                setSize(data.size);
                setSkip(0);
            }
        })
    }    

    //handel Filters
    const handelFilters = (filters, filterBy)=>{
        const newFilters = {...myFilter};
        newFilters.filter[filterBy] = filters;

        if(filterBy == "price"){
            let priceValue = handelPrice(filters);
            newFilters.filter[filterBy] = priceValue
        }

        loadFilterResult(myFilter.filter)
        setMyFilter(newFilters);
    }

    const handelPrice = (value)=>{
        let data = prices;
        let arr = [];
        for (let key in data){
            if(data[key]._id === parseInt(value)){
                arr = data[key].array;
            }
        }

        return arr;
    }

    const loadMore = ()=>{
        let toSkip = skip + limit;
        getFilterProduct(toSkip, limit, myFilter.filter).then((data)=>{
            if(data.error){
                setError(data.error);
            }else{
                setResult([...result, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }
    const showLoadMoreButton = ()=>{
        return(
            size > 0 &&
            size >= limit && (<button className='btn btn-warning mb-5' onClick={loadMore}>Load More</button>)
        )
    }
    useEffect(()=>{
        loadCategories();
        loadFilterResult(skip, limit, myFilter.filter)
    },[])
    return (
        <Layout title='Shop' description='this is the shop page'>
            <Container>
                <Row>
                    <Col md={3} className="pl-5">
                        <h4>Filters by Categories</h4>
                        <ul>
                            <Checkbox categories={categories} handelFilters={(filters)=> handelFilters(filters, "Category")} />
                        </ul>
                        <h4>Filters by Price</h4>
                        <div>
                            <RadioBox price={prices} handelFilters={(filters)=> handelFilters(filters, "price")} />
                        </div>
                    </Col>

                    <Col md={9}>
                        <Container>
                            <h2 className="mb-4">Products</h2>
                            <Row>
                                {result.map((product, i)=>(
                                    <Col md={4} className="mb-3">
                                        <Card key={i} product={product} />
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    </Col>
                    <hr />
                    {showLoadMoreButton()}
                </Row>
            </Container>
        </Layout>
    );
};

export default Shop;