import { Router } from "express"
import {productsMongo} from "../dao/managers/products/ProductsMongo.js"

const router = Router()


router.get('/', async(req, res) => {
    try {
        const products = await productsMongo.findAll(req.query)
        const payloadArray = products.info.payload        //console.log(payloadArray);
        res.status(200).json({payload: payloadArray})
      
        //console.log("Rendering home:", products);
        //res.render("home",  {allProd}  );
       
    } catch (error) {
        res.status(500).json({error})
       
    }
    })

router.get('/:id', async(req, res) => {
    const {id} = req.params
    try {
        const product = await productsMongo.findById(id)
        if(!product){
            res.status(400).json({message:'Invalid ID'})
        } else {
            res.status(200).json({message:'Product found', product})
        }
        
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/', async(req, res) => {
    const {title, description, price, thumbnail, code, stock} = req.body
    if(!title  || !description  || !price  || !thumbnail  || !code  || !stock){
       return res.status(200).json({message:'Some data is missing'})
    }
    try {
        const newProduct = await productsMongo.createOne(req.body)
        res.status(200).json({message:'Product created', product: newProduct})

    } catch (error) {
        res.status(500).json({error})
    }

})

router.put('/:id', async(req, res) => {
    const {id} = req.params
    const updatedProductData = req.body;
    try {
        const product = await productsMongo.updateOne(id, updatedProductData)
        if(!product){
            res.status(400).json({message:'Invalid ID'})
        } else {
            res.status(200).json({message:'Product found', product})
        }
        
    } catch (error) {
        res.status(500).json({error})
    }
})

router.delete('/:id', async(req, res) => {
    const {id} = req.params
    try {
        const product = await productsMongo.deleteOne(id)
        if(!product){
            res.status(400).json({message:'Invalid ID'})
        } else {
            res.status(200).json({message:'Product found', product})
        }
        
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router