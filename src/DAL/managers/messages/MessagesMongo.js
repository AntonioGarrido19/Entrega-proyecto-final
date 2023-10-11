import {messagesModel} from '../../mongoDB/models/messages-model.js'


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

}

export const messagesMongo = new MessagesMongo()