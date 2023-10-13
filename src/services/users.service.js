import { usersManager } from "../DAL/managers/session/UsersMongo.js";

class UsersService {

async findUser (username) {
  const users = await usersManager.findUser(username);
  return users;
};

async create (user) {
  const newUser = await usersManager.create(user);
  return newUser;
};

async deleteUser (username) {
  const response = await usersManager.deleteUser({ username });
  return response;
};

}

export const usersService = new UsersService()