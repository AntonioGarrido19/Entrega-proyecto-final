import { Router } from "express";
import {
  getMessages,
  createMessage,
  getMessageById,
} from "../controllers/messages.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";


const router = Router();

router.get("/", jwtValidation,authMiddleware('user'), getMessages);

router.post("/", createMessage);

router.get("/:id", getMessageById);


export default router;
