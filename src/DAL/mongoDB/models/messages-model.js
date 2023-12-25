import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


const messagesSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    message: 
        {
        type: String,
        required: true
    },
})

messagesSchema.plugin(mongoosePaginate)


export const messagesModel = mongoose.model('Messages', messagesSchema)