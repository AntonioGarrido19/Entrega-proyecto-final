import { usersService } from "../services/users.service.js";
import { hashData } from "../utils.js";
import { transporter } from "../nodemailer.js";
import { logger } from "../winston.js";

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
          res.status(500).json({ message: "Error in user creation or email sending" });
        }
      }
}

export const authenticationController = new AuthenticationController()