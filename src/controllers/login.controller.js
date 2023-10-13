import {usersService} from "../services/users.service.js"
import { compareData } from "../utils.js"


class LoginController {

    async userLogin (req,res){
        const {username,password} = req.body
        if(!username || !password){
            return res.status(400).json({message: 'Some data is missing'})
        }
        const userDB = await usersService.findUser(username)
        if(!userDB){
            return res.status(400).json({message:'Signup first'})
        }
        const isPasswordValid = await compareData(password, userDB.password)
        if(!isPasswordValid){
            return res.status(401).json({message:'Username or password not valid TRY AGAIN'})
        }
    
        req.session['username'] = username
        res.redirect('/api/views/products')
    
    }
}

export const loginController = new LoginController()