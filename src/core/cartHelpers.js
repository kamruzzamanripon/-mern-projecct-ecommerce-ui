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

//Delete Cart Item
export const removeItem = (productID)=>{
    let cart = [];
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.map((product, i)=>{
        if(product._id == productID){
            cart.splice(i, 1)
        }
    })

    localStorage.setItem('cart', JSON.stringify(cart))

    return cart;
}

//update Cart Items
export const updateItem = (productID, count) =>{
    let cart = [];
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    cart.map((product, i)=>{
        if(product._id == productID){
            cart[i].count = count;
        }
    })

    localStorage.setItem('cart', JSON.stringify(cart))
}


//empty Cart
export const emptyCart = (next) =>{
    if(typeof window != 'undefined'){
        localStorage.removeItem('cart')
        next()
    }
}


