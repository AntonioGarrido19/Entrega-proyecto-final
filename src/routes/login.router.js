import {Router} from "express";
import { loginController } from "../controllers/login.controller.js"
import { usersManager } from '../DAL/managers/session/UsersMongo.js'
import { compareData } from "../utils.js"


const router= Router()

router.post('/', loginController.userLogin)

// router.get('/home', async(req,res)=>{
//     const {username} = req.session
//     const userDB = await usersManager.findUser(username)
//     res.redirect('/products')
// })


export default router

// router.get('/home', async(req,res)=>{
//     const {username} = req.session
//     const userDB = await usersManager.findUser(username)
//     if(userDB.isAdmin){
//         res.redirect('/api/views/adminHome')
//     }else{
//         res.redirect('/api/views/clientHome')
//     }
// })