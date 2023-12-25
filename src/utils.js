import {dirname} from 'path'
import {fileURLToPath} from 'url'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretKey = "KEYJWT"

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashData = async(data) =>{
    return bcrypt.hash(data,10)
}

export const compareData = async(data, hash)=>{
    return bcrypt.compare(data, hash)
}

export const generateToken = (user)=>{
    const token = jwt.sign({user},secretKey,{expiresIn:'1h'})
    return token
}