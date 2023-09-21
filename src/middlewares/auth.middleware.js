export const authMiddleware = role =>{
    return(req,res,next)=>{
        if(req.user.role !== role){
            res.status(401).json({message: "Action not authorized"})
        }
        next()
    }
}