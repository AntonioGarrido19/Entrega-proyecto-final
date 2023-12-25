import { usersManager } from "../DAL/managers/session/UsersMongo.js"
import UsersDTO from "../DAL/DTOs/user.dto.js"
import { hashData } from "../utils.js";
import { logger } from "../winston.js";
import { usersModel } from "../DAL/mongoDB/models/users-model.js";


class UsersService {

    async findAll() {
      const users = await usersManager.findAll();
      return users;
    }

async findUser (username) {
  const users = await usersManager.findUser(username);
  logger.debug(users)
  return users;
};

async create (user) {
  const newUser = await usersManager.create(user);
  logger.debug(newUser)
  return newUser;
};

// async create (user) {
//   const hashPassword = await hashData(user.password)
//   if (!hashPassword) throw new Error ("Password can not be hashed")
//   const userDTO = new UsersDTO({ ...user, password: hashPassword })
//   const newUser = await usersManager.create(userDTO);
//   return newUser;
// };

async deleteUser (username) {
  const response = await usersManager.deleteUser({ username });
  return response;
};

async updateUser(uid, updatedData) {
  try {
    const updatedUser = await usersModel.findOneAndUpdate(
      { _id: uid },
      { $set: updatedData },
      { new: true }
    );

    logger.warning(updatedUser)
    return updatedUser;

  } catch (error) {
    console.log('Error:', error);
    return error;
  }
}
}

export const usersService = new UsersService()