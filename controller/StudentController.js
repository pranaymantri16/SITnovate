import studModel from "../models/studentModel.js";
import { hashedPassword } from "../Helper/authHelper.js";
import { checkPassword } from "../Helper/authHelper.js";
export const registerStud=async(req,res)=>{
    const{email,password}=req.body
    if(!email){
        return res.status(404).send({message:"E-mail is required"});
    }
    if(!password){
        return res.status(404).send({message:"Password is required"});
    }

    const student=await studModel.findOne({email})
        if(student){
            return res.status(404).send({message:"E-mail already registered"});
        }
    const hashedpassword=await hashedPassword(password)
    const user=await new universityModel({email:email,password:hashedpassword}).save()
        return res.status(201).send({
            success:true,
            message:"Student Registered Successfully",
            user
        })
    
}

export const loginStud=async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email==null){
            return res.status(400).send({message:"Enter correct email!"});
        }
        if(!password){
            return res.status(400).send({message:"Password is required!"});
        }
        const user = await studModel.findOne({email});
        if(await checkPassword(password,user.password)){
            const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
            return res.status(201).send({
                success:true,
                message:"User Logged-In Successfully",
                token,
                user:{
                    id:user._id,
                    email:user.email
                }
            })
        }
        else{
            return res.status(400).send({
                message:"Invalid user email or password"
            })
        }
    } catch (error){
        return res.status(400).send({
            success:false,
            message:"Error in student Sign-in",
            error
        })
    }
}

export const getStud=async(req,res)=>{
    try {
        const{sid}=req.body
        const student=await studModel.findById(sid);
        return res.status(200).send({
            success:true,
            message:"Getting the user",
            student
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in getting the student"
        })
    }
}
