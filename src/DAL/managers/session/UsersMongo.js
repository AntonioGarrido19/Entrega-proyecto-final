import { usersModel } from "../../mongoDB/models/users-model.js";


class UsersManager {

    async findUser(username){
        try {
            const user = await usersModel.findOne({username})
            return user;
        } catch (error) {
            return error
        }
    }

    async create(user){
        try {
            const newUser = await usersModel.create(user)
            return newUser
        } catch (error) {
            return error
        }
    }


    async deleteUser(username){
        try {
            const user = await usersModel.findOneAndDelete(username)
            return user
        } catch (error) {
            return error
        }
    }

    async updateUser(uid, updatedData){
        try {
            const updatedUser = await usersModel.updateOne({_id:uid}, { $set: updatedData })
            return updatedUser
        } catch (error) {
            return error;

        }
    }
}

export const usersManager = new UsersManager()