import {messagesMongo} from '../DAL/managers/messages/MessagesMongo.js'

export const findAll = async()=>{
    const messages = await messagesMongo.findAll()
    return messages
}

export const create = async(obj)=>{
    const newMessage = await messagesMongo.createOne(obj)
    return newMessage
}


export const findById = async(id)=>{
    const message = await messagesMongo.findById(id)
    return message
}