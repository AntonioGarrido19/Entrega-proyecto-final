import {cartsMongo} from '../DAL/managers/carts/CartsMongo.js'

export const findAll = () => {
    const carts = cartsMongo.findAll()
    return carts
}

export const create = (obj) =>{
    const cart = cartsMongo.create(obj)
    return cart
}


export const findById = async(id)=>{
    const cart = await cartsMongo.findById(id)
    return cart
    }
    
    export const update = async(id, obj)=>{
        const cart = await cartsMongo.updateOne( { _id: id }, { ...obj })
        return cart
    }
    
    export const deleteOne = async(id)=>{
        const response = await cartsMongo.deleteOne(id)
        return response
    }
    

    export const deleteProduct = async(idCart, idProduct)=>{
        const response = await cartsMongo.deleteProduct(idCart, idProduct)
        return response
    }

    export const updateProductQuantity = async(cartId, productId, updatedQuantity)=>{
        const response = await cartsMongo.updateProductQuantity(cartId, productId, updatedQuantity)
        return response
    }