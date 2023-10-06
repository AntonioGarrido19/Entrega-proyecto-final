import { findUser, create, deleteUser } from "../services/users.service.js"

export const findUser = (req, res) => {
    const { username } = req.params;
    try {
      const user = findUser(username);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User found", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const createUser = (req, res) => {
    const {username} = req.params;
    try {
        const user = deleteUser(username);
        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({message: error.message})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}