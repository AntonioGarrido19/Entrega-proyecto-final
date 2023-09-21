import jwt from "jsonwebtoken"

const secretKey = "KEYJWT"

export const jwtValidation = (req,res,next)=>{
try {
    const authHeader = req.get('Authorization')
    const token = authHeader.split(' ')[1]
    const response = jwt.verify(token, secretKey)
    req.user = response.user
    console.log('response', response);
    next()

} catch (error) {
    res.status(500).json({message:error})
}
}



// //con cookies
// export const jwtValidation = (req,res,next)=>{
//     try {
//         const authHeader = req.cookies.token
//         const token = authHeader.split(' ')[1]
//         const response = jwt.verify(token, secretKey)
//         req.user = response.user
//         console.log('response', response);
//         next()
    
//     } catch (error) {
//         res.status(500).json({message:error})
//     }
    
//     }

