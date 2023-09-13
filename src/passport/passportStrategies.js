import passport from 'passport'
import { usersModel } from '../db/models/users-model.js'






//CONTINUAR EN MINUTO 00:30 ESTRATEGIA DE AUTENTICACION POR TERCEROS




// user => id
passport.serializeUser((user, done)=>{
    done(null, user._id)
})


// id => user
passport.deserializeUser(async(id, done)=>{
    try {
        
    } catch (error) {
        done(error)
    }

})