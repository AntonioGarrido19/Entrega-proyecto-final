import { usersService} from "../services/users.service.js"
import CustomError from "../errors/CustomError.js";
import { ErrorMessage, ErrorName } from "../errors/error.enum.js";

class UsersController {

// async findUser (req, res) {
//     const { username } = req.params;
//     try {
//       const user = await usersService.findUser(username);
//       if (!user) return res.status(404).json({ message: "User not found" });
//       res.status(200).json({ message: "User found", user });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// }


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
  if (!first_name || !last_name || email || password) {
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

}

export const usersController = new UsersController();