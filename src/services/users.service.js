import { usersManager } from "../DAL/managers/session/UsersMongo.js";

export const findUser = async (username) => {
  const users = await usersManager.findUser({ username });
  return users;
};

export const create = async (user) => {
  const newUser = await usersManager.create(user);
  return newUser;
};

export const deleteUser = async (username) => {
  const response = await usersManager.deleteUser({ username });
  return response;
};
