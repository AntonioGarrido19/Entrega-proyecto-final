import { Router } from "express";
import { usersManager } from "../DAL/managers/session/UsersMongo.js";
import { generateToken, compareData } from "../utils.js";
import {jwtValidation} from '../middlewares/jwt.middleware.js'
import passport from 'passport';
import jwt from 'jsonwebtoken'; 

const secretKey = "KEYJWT"

const router = Router();

//sin cookies
router.post("/", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
          return res.status(400).json({ message: "Some data is missing" });
        }
        const userDB = await usersManager.findUser(username);
        if (!userDB) {
          return res.status(400).json({ message: "Signup first" });
        }
        const isPasswordValid = await compareData(password, userDB.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Username or password not valid" });
        }
        //const token = generateToken(userDB);
        //console.log('token',token);
         // Generate a JWT token with the username in the payload
         const tokenPayload = {
          first_name: userDB.first_name,
          last_name:  userDB.last_name,
          username: userDB.username,
          email: userDB.email,

          // You can include other data in the payload if needed
      };
      const token = jwt.sign(tokenPayload, secretKey);

      // Log the token for debugging purposes
      console.log('JWT Token:', token);
      
        res.redirect('/api/views/products')
    } catch (error) {
        res.status(500).json({message:error})
    }
});


//con cookies
// router.post("/", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         if (!username || !password) {
//           return res.status(400).json({ message: "Some data is missing" });
//         }
//         const userDB = await usersManager.findUser(username);
//         if (!userDB) {
//           return res.status(400).json({ message: "Signup first" });
//         }
//         const isPasswordValid = await compareData(password, userDB.password);
//         if (!isPasswordValid) {
//           return res.status(401).json({ message: "Username or password not valid" });
//         }
//         const token = generateToken(userDB);
//         console.log('token',token);
//         // res.status(200).cookie('token',token).json({ message: "Token generated", token });

        
//     } catch (error) {
//         res.status(500).json({message:error})
//     }
// });


// router.get('/validation',jwtValidation,(req,res)=>{
   
//     res.send({...req.user})
// })

router.get('/validation', passport.authenticate('jwt',{ session: false}), (req,res)=>{
  res.json({message:'Probando',user:req.user})
})



export default router
