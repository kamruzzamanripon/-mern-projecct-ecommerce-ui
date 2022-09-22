import { API } from "../config";

//get user Order history
export const getOrderHistory = (userId, token) =>{
    return fetch(`${API}/orders/by/user/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
       
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}

//get User
export const getUserInfo = (userId, token) =>{
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
       
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}

//Update User info
export const updateUserInfo = (userId, token, userData) =>{
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers:{
            Accept:"application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
    .then((data)=>{
        return data.json();
    })
    .catch((err)=>{
        return err.json();;
    })
}