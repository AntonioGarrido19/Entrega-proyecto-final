import { usersService} from "../services/users.service.js"

class UsersController {

async findUser (req, res) {
    const { username } = req.params;
    try {
      const user = await usersService.findUser(username);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User found", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

async deleteUser (req, res) {
    const {username} = req.params;
    try {
        const user = usersService.deleteUser(username);
        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({message: error.message})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

}

export const usersController = new UsersController();