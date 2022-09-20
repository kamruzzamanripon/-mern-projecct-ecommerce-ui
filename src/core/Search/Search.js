import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { getCategory, getSearchedProducts } from '../apiCore';
import Card from '../Card/Card';
//import queeryString form 'qu'


const Search = () => {
    const [data, setData] = useState({
        categories:[],
        category:'',
        search:'',
        result:[],
        searched: false
    });
    const {categories, category, search, result, searched} = data;

    //console.log("All Data", data)
    //load all Categories
    const loadCategories = ()=>{
        getCategory(). then((data)=>{
            if(data.error){
                console.log(data.error);
            }else{
                setData({...data, categories:data})
            }
        })
    }


    //handel change
    const handelChange = (name) => (event) =>{
        setData({...data, [name]: event.target.value, searched:false})
    }

    //get Search result
    const searchData = ()=>{
        //console.log(search, category)
        if(search){
            getSearchedProducts({
                search: search || undefined,
                category: category || "All"
            }).then((products)=>{
                if(products.error){
                    console.log(products.error)
                }else{
                    setData({...data, result: products, searched: true })
                    console.log("All Data products", products)
                }
            })
        }
    }

    //Show Searched Msg
    const showSearchMSG = (searched, result)=>{
        if(searched && result.length > 0 ){
            return `Found ${result.length} Products`
        }else if( searched && result.length <= 0){
            return `No Products Found`
        }
    }

    //Show Search Data
    const showSearchProduct = (productData =[])=>{
        return(
            <Container>
                <h3 className="mt-4 mb-4 ml-4"> {showSearchMSG(searched, result)} </h3>
                <Row>
                    {productData.map((product, i)=>(
                        <Col md={4}>
                            <Card key={i} product={product} />
                        </Col>
                    ))}
                </Row>
            </Container>
        )
    }

    //Form submit
    const searchSubmit = (e)=>{
        e.preventDefault();
        searchData();
    }
    
    useEffect(()=>{
        loadCategories();
    },[])

    //Search Bar form
    const searchForm = ()=>{
        return(
            <form onSubmit={searchSubmit}>
                <span className="input-group-text">
                    <div className="input-group input-group-lg">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handelChange('category')}>
                                <option value="All">All</option>
                                {categories.map((c, i)=>(
                                    <option value={c._id} key={i}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </span>

                <input type="search" className='form-control' placeholder='Search Item..' onChange={handelChange('search')} />

                <div className="btn iput-group-append" style={{ border: "none" }}>
                    <button className="input-group-text">Search... <FontAwesomeIcon icon={faSearch} /></button>
                </div>
            </form>
        )
    }
    return (
        <div>
            <div className="mb-3">{searchForm()}</div>
            {showSearchProduct(result)}
        </div>
    );
};

export default Search;