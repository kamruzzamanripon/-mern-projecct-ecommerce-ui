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

