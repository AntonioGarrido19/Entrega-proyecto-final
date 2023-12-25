import { usersService} from "../services/users.service.js"
import CustomError from "../errors/CustomError.js";
import { ErrorMessage, ErrorName } from "../errors/error.enum.js";
import { logger } from "../winston.js";
import UsersDTO from "../DAL/DTOs/user.dto.js";

class UsersController {


async getUsers(req, res) {
  try {
    const users = await usersService.findAll();
    console.log("Users from the database:", users);
    const usersDTOs = users.map(user => new UsersDTO(user));

    if (users.length) {
      res.status(200).json({ message: "Users", users: usersDTOs });
    } else {
      res.status(200).json({ message: "No users found" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}


async findUser(req, res) {
  const { username } = req.params;
  try {
    const user = await usersService.findUser(username);
    if (!user) {
     throw new CustomError(ErrorMessage.USER_NOT_FOUND);
    }
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async create (req, res) {
  const {first_name, last_name, email, password} = req.body
  if (!first_name || !last_name || !email || password) {
    throw new CustomError(ErrorMessage.USER_MISSING_DATA);
  }
  try {
    const createdUser = await usersService.create(req.body);
    res.status(200).json({message:'User created', user: createdUser})
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

async deleteUser (req, res) {
    const {username} = req.params;
    try {
        const user = await usersService.deleteUser(username);
        if(!user) {
        throw new CustomError(ErrorMessage.USER_NOT_FOUND);
      }
        res.status(200).json({message: 'User deleted', deletedUser: user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

async updateUser(req, res) {

  console.log('User id:', req.params)
  const { uid } = req.params;
  const { updatedUserData } = req.body;

  logger.debug('Received Updated User Data:', updatedUserData);

  console.log('Updated User Data:', updatedUserData);
  
  try {
    const user = await usersService.updateUser(uid, updatedUserData);
    if (!user) {
     throw new CustomError(ErrorMessage.PRODUCT_NOT_FOUND);
     

    } else {
      res.status(200).json({ message: "User found and updated", user });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

}

export const usersController = new UsersController();