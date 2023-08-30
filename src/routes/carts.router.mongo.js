import { Router } from "express"
import {cartsMongo} from "../dao/managers/carts/CartsMongo.js"

const router = Router()


router.get('/', async(req, res) => {
    try {
        const carts = await cartsMongo.findAll()
        if(carts.length){
        res.status(200).json({message:'Carts', carts})
    }else{
        res.status(200).json({message:'No carts found'})
    }
    } catch (error) {
        res.status(500).json({error})
    }
})

router.get('/:id', async(req, res) => {
    const {id} = req.params
    try {
        const cart = await cartsMongo.findById(id)
        if(!cart){
            res.status(400).json({message:'Invalid ID'})
        } else {
            res.status(200).json({message:'Cart found', cart})
        }
        
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/', async(req, res) => {
    const {products} = req.body
    if(!products){
       return res.status(400).json({message:'Some data is missing'})
    }
    try {
        const newCart = await cartsMongo.createOne(req.body)
        res.status(200).json({message:'Cart created', cart: newCart})

    } catch (error) {
        res.status(500).json({error})
    }

})



export default router