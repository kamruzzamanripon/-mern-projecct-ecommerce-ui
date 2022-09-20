//add new Item to card
export const addItem = (item, next) =>{
    let cart = [];
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({...item, count:1});

        cart = Array.from(new Set(cart.map((p)=> p._id))).map((id)=>{
            return cart.find((p)=> p._id === id)
        })
        localStorage.setItem('cart', JSON.stringify(cart))
        next()
    }
}

//get Total item number
export const itemTotal = ()=>{
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}


//get All Cart Item Data
export const getCart = ()=>{
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'));
        }
    }

    return [];
}

