import { API } from "../config";

//Create Category
export const createCategory = (userId, token, category) =>{
    //console.log("aixos", userId, token, category)
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify(category),
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
    })
}

//Get all Category
export const getCategory = ()=>{
    return fetch(`${API}/categories`, {
        method: "GET",
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}


//Create New Product
export const createProduct = (userId, token, product) =>{
    //console.log("aixos", userId, token, category)
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body: product,
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
    })
}

//Get all Products
export const getProducts = ()=>{
    return fetch(`${API}/products?limit=100`, {
        method: "GET",
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}



//Delete Product
export const deleteProduct = (productId, userId, token) =>{
    //console.log("aixos", userId, token, category)
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "DELETE",
        headers:{
            Accept:"application/json",
            "content-Type": "application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
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


//Update Product
export const updateProduct = (productId, userId, token, product) =>{
    //console.log("aixos", userId, token, category)
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: "PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body: product,
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
    })
}