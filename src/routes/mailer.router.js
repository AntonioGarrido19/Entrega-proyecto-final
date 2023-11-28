import { Router } from "express";
import { transporter } from "../nodemailer.js";
import { logger } from "../winston.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { jwtValidation } from "../middlewares/jwt.middleware.js";
import { usersController } from "../controllers/users.controller.js";
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


router.get('/restore', authMiddleware('user'), async (req, res) => {
  const {username} = req.body;

  // Generate a unique token for password reset
  const resetToken = crypto.randomBytes(20).toString('hex');

  userData = await usersService.findUser(username);

  // Store the token in the database or in-memory store with user identifier (email, user ID, etc.)
  // For simplicity, let's assume you have a users collection in MongoDB
  await usersController.updateOne({ email: userData.email }, { $set: { resetToken } });

  const resetLink = `http://localhost:8080/api/views/passwordrestore?token=${resetToken}`;
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
