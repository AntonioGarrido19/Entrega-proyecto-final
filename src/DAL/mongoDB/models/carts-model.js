import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  { _id: false }],
});

cartsSchema.plugin(mongoosePaginate);

export const cartsModel = mongoose.model("Carts", cartsSchema);




// import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

// const cartsSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   products: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Products"
//       }
//   ],
// });

// cartsSchema.plugin(mongoosePaginate);

// export const cartsModel = mongoose.model("Carts", cartsSchema);