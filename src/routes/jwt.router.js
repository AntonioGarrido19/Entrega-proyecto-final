import { Router } from "express";
import {jwtValidation} from '../middlewares/jwt.middleware.js'
import passport from 'passport';
import jwt from 'jsonwebtoken'; 
import { jwtController } from "../controllers/jwt.controller.js"

//const secretKey = "KEYJWT"

const router = Router();

//sin cookies
router.post("/", jwtController.jwtLogin);


router.get('/validation', jwtValidation, (req, res) => {
  res.json({message:'Probando',user:req.user})
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


export default router
