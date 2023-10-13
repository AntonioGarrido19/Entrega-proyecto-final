import {usersService} from "../services/users.service.js"
import { hashData } from "../utils.js"

class AuthenticationController {

    async signUpUser (req,res){
        const {first_name,last_name,username,password, email} = req.body
        if(!first_name || !last_name || !username || !password || !email){
            res.status(400).json({mensaje: 'Some data is missing'})
        }
        const userDB = await usersService.findUser(username)
        if(userDB){
            return res.status(400).json({message: 'Username already in use'})
        }
        const hashPassword = await hashData(password)
    
        let newUser;
    
        if(email === 'adminCoder@coder.com') {
            newUser = usersService.create({...req.body, password:hashPassword, isAdmin:true, user:false})
        } else {
            usersService.create({...req.body, password:hashPassword})
        }
        res.redirect('/api/views/products')
    }
}

export const authenticationController = new AuthenticationController()