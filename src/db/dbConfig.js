import mongoose from "mongoose";


const URI = 'mongodb+srv://antogarrido98:Puntarubia2023@coderhousecluster.1xhgeyw.mongodb.net/ecommerce?retryWrites=true&w=majority'


mongoose.connect(URI)
.then(() =>console.log('Conectado a la base de datos'))
.catch(error => console.log(error))