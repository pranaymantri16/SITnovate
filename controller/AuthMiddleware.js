import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const RequireSignIn=async(req,res,next)=>{
    const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
    req.user= decode;
    next();
}

// export const requireSignin=async(req,res,next)=>{
    
// }
