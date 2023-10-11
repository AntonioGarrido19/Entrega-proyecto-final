import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import {findUser, createUser, deleteUser} from "../controllers/users.controller.js"

const router = Router();

router.get("/:username",jwtValidation,authMiddleware('premium'), findUser)

router.delete("/:username",jwtValidation,authMiddleware('admin'), async(req,res)=>{
 
})

export default router;
