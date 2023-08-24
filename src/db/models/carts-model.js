import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    products: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
],
})

export const cartsModel = mongoose.model('Carts', cartsSchema)