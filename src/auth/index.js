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

//Save jwt to user loacl storage
export const authenticate = (data, next)=>{
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}

//Authenticate check
export const isAuthenticate = ()=>{
    if(typeof window == undefined){
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}

//Sign Out
export const signOut = (next)=>{
    if(typeof window !== undefined){
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`, {
            method: "GET",
        })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            return err;
        })
    }

    
}