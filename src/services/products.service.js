import {productsMongo} from '../DAL/managers/products/ProductsMongo.js'



export const findAll = async(obj)=>{
const products = await productsMongo.findAll(obj)
return products
}

export const  create = async(obj) =>{
    const product = await productsMongo.createOne(obj)
    return product
}

export const findById = async(id)=>{
const product = await productsMongo.findById(id)
return product
}

export const update = async(id, updatedData)=>{
    const product = await productsMongo.updateOne( { _id: id },
        { $set: updatedData })
    return product
}

export const deleteOne = async(id)=>{
    const response = await productsMongo.deleteOne(id)
    return response
}
