import {Router} from "express";
import { usersManager } from '../dao/managers/session/UsersMongo.js'
import { compareData } from "../utils.js"
import passport from 'passport'

const router= Router()

router.post('/', async (req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({message: 'Some data is missing'})
    }
    const userDB = await usersManager.findUser(username)
    if(!userDB){
        return res.status(400).json({message:'Signup first'})
    }
    const isPasswordValid = await compareData(password, userDB.password)
    if(!isPasswordValid){
        return res.status(401).json({message:'Username or password not valid'})
    }

    req.session['username'] = username
    res.redirect('/api/views/products')

})

router.get('/home', async(req,res)=>{
    const {username} = req.session
    const userDB = await usersManager.findUser(username)
    res.redirect('/products')
})


router.get('/githubSignin', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/api/users/github',passport.authenticate('github'),async(req,res)=>{
    console.log(req);
    res.redirect('/api/views/products')
})


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