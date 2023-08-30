import {messagesModel} from '../../../db/models/messages-model.js'


class MessagesMongo {

    async findAll(){
        try {
            const messages = await messagesModel.find({})
            return messages
        } catch (error) {
            return error
        }
    }

    async createOne(obj){
        try {
            const newMessage = await messagesModel.create(obj)
            return newMessage
        } catch (error) {
            return error
        }
    }

    async findById(id){
        try {
            const message = await messagesModel.findById(id)
            return message
        } catch (error) {
            return error
        }
    }

    // async updateOne(id, obj){
    //     try {
    //         const response = await cartsModel.updateOne({_id:id}, {set:{obj}})
    //         return response
    //     } catch (error) {
    //         return error
    //     }
    // }


    // async deleteOne(id){
    //     try {
    //         const response = await cartsModel.findByIdAndDelete(id)
    //         return response
    //     } catch (error) {
    //         return error
    //     }
    // }

}

export const messagesMongo = new MessagesMongo()