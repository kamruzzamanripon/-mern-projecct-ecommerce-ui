import queeryString from 'query-string';
import { API } from "../config";


export const getProducts = (sortBy)=>{
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method:"GET"
    })
    .then((data)=>{
        return data.json()
    })
    .catch((err)=>{
        console.log(err);
    })
}

//Get Single Product
export const getSingleProduct = (productId)=>{
    return fetch(`${API}/product/${productId}`, {
        method:"GET"
    })
    .then((data)=>{
        //console.log('fecth', data)
        return data.json()

    })
    .catch((err)=>{
        console.log(err);
    })
}

//Get Related Products
export const getRelatedProducts = (productId)=>{
    return fetch(`${API}/products/related/${productId}`, {
        method:"GET"
    })
    .then((data)=>{
        //console.log('fecth', data)
        return data.json()

    })
    .catch((err)=>{
        console.log(err);
    })
}

//get All Categories
export const getCategory =()=>{
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
    })
}

//Get Searched Products
export const getSearchedProducts = (params)=>{
    const query = queeryString.stringify(params)
    //console.log("query parmas", query)

    return fetch(`${API}/products/search?${query}`, {
        method: "GET",
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}

//get Filtered Product
export const getFilterProduct = (skip, limit, filters={})=>{
    const data = {
        limit,
        skip,
        filters
    }

    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}


//Generate Braintree Token
export const getBraintreeClientToken = (userId, token) =>{
    return fetch(`${API}/braintree/gettoken/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
       
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}


//Payment Process Braintree Token
export const processPayment = (userId, token, paymentData) =>{
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
       body: JSON.stringify(paymentData)
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}


//Create an Order
export const createOrder = (userId, token, createOrderData) =>{
    return fetch(`${API}/order/create/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
       body: JSON.stringify({ order: createOrderData})
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}



