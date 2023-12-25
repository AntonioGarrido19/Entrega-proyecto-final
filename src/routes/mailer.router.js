import { Router } from "express";
import { transporter } from "../nodemailer.js";
import { logger } from "../winston.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { usersController } from "../controllers/users.controller.js";
import { usersService } from "../services/users.service.js";
import crypto from 'crypto'

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


router.get('/restore', async (req, res) => {
  const {usernameRestore} = req.query;
  logger.warning('Username:', usernameRestore);

  if (!usernameRestore) {
    return res.status(400).json({ error: 'Username is required in the query parameters' });
  }

  const userData = await usersService.findUser(usernameRestore);

  logger.warning('UserData', userData)

 

  const resetLink = `http://localhost:8080/api/views/passwordrestore?username=${usernameRestore}`;
  const messageOpt = {
    from: 'E-Commerce',
    to: userData.email,
    subject: 'Restore Password',
    text: `Click on the following link to restore your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(messageOpt);
    res.json({ message: 'Mail sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

export default router;
