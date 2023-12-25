import { usersService } from "../services/users.service.js";
import { usersController } from "./users.controller.js";
import { hashData } from "../utils.js";
import { transporter } from "../nodemailer.js";
import { logger } from "../winston.js";
import bcrypt from "bcrypt";

class AuthenticationController {
  async signUpUser(req, res) {
    const { first_name, last_name, username, password, email } = req.body;
    if (!first_name || !last_name || !username || !password || !email) {
      return res.status(400).json({ mensaje: "Some data is missing" });
    }

    const userDB = await usersService.findUser(username);
    if (userDB) {
      return res.status(400).json({ message: "Username already in use" });
    }

    const hashPassword = await hashData(password);

    try {
      let newUser;

      if (email === "adminCoder@coder.com") {
        newUser = await usersService.create({
          ...req.body,
          password: hashPassword,
          isAdmin: true,
          user: false,
        });
      } else {
        newUser = await usersService.create({
          ...req.body,
          password: hashPassword,
        });
      }

      const messageOpt = {
        from: "coderhouse43400",
        to: email,
        subject: "Registro",
        text: `Registro exitoso. Bienvenido ${first_name} ${last_name}`,
      };
      await transporter.sendMail(messageOpt);

      res.redirect("/api/views/products");
    } catch (error) {
      logger.error("Error during user creation or email sending:", error);
    }
  }

  async restorePassword(req, res) {
    const { username } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || !username) {
      return res.status(400).json({ mensaje: "Some data is missing" });
    }

    try {
      const userData = await usersService.findUser(username);

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      const uid = userData._id;

      // Update the user's password
     const user = await usersService.updateUser(uid, {password: hashedPassword});

     console.log('User:', user);
      if (!user) {
        // throw new CustomError(ErrorMessage.PRODUCT_NOT_FOUND);
        return res.status(404).json({ error: "User not found" });
   
       } else {
         res.status(200).json({ message: "User found and updated", user });
       }

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error restoring password" });
    }
  }
}

export const authenticationController = new AuthenticationController();
