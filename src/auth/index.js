import { API } from '../config';

//user signup
export const singUp = (user) =>{
    return fetch(`${API}/singup`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
    })
}

//Sign in
export const singIn = (user) =>{
    return fetch(`${API}/signin`, {
        method: "POST",
        headers:{
            Accept:"application/json",
            "content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
    .then((res)=>{
        return res.json();
    })
    .catch((err)=>{
        return err;
    })
}