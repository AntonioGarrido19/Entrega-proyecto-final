import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { usersController } from "../controllers/users.controller.js";

const router = Router();

router.get(
  "/",
  jwtValidation,
  authMiddleware("admin"),
  usersController.getUsers
);

router.delete(
  "/",
  jwtValidation,
  authMiddleware("admin"),
  usersController.getUsers
);

router.get(
  "/:username",
  jwtValidation,
  authMiddleware("user"),
  usersController.findUser
);

router.get(
  "/current/user",
  jwtValidation,
  authMiddleware("user"),
  (req, res) => {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({ user: userData });
  }
);

router.delete(
  "/:username",
  jwtValidation,
  authMiddleware("admin"),
  usersController.deleteUser
);

router.put("/:uid", usersController.updateUser);

export default router;
