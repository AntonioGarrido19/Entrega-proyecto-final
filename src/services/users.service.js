import { usersManager } from "../DAL/managers/session/UsersMongo.js"
import UsersDTO from "../DAL/DTOs/user.dto.js"
import { hashData } from "../utils.js";
import { logger } from "../winston.js";


class UsersService {

async findUser (username) {
  const users = await usersManager.findUser(username);
  logger.debug(users)
  return users;
};

async create (user) {
  const newUser = await usersManager.create(user);
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

async update(uid, updatedData) {
  const user = await usersMongo.updateOne(uid, updatedData);
  return user;
}

}

export const usersService = new UsersService()