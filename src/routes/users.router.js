import { Router } from "express";
import { usersManager } from "../dao/managers/session/UsersMongo.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const router = Router();

router.get("/:username",jwtValidation,authMiddleware('premium'), async (req, res) => {
  const { username } = req.params;
  try {
    const user = await usersManager.findUser(username);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:username",jwtValidation,authMiddleware('admin'), async(req,res)=>{
    const {username} = req.params;
    try {
        const user = await usersManager.deleteUser(username);
        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({message: error.message})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

export default router;
