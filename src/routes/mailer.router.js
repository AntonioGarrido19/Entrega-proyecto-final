import { Router } from "express";
import { transporter } from "../nodemailer.js";
import { logger } from "../winston.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";

const router = Router();

router.get("/", jwtValidation, authMiddleware("user"), async (req, res) => {
  const userData = req.user;

  const messageOpt = {
    from: "coderhouse43400",
    to: userData.email,
    subject: "Registro",
    text: `Registro exitoso. Bienvenido ${userData.first_name} ${userData.last_name}`,
  };
  await transporter.sendMail(messageOpt);
  res.send("Mail sent");
});

export default router;
