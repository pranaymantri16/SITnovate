import universityModel from "../models/universityModel.js";
import { hashedPassword } from "../Helper/authHelper.js";

export const registerUniversity=async(req,res)=>{
    try{
    const {email,name,location,password}=req.body
    if(!name){
        return res.status(404).send({message:"Name is required"});
    }
    if(!email){
        return res.status(404).send({message:"E-mail is required"});
    }
    if(!password){
        return res.status(404).send({message:"Password is required"});
    }
    if(!location){
        return res.status(404).send({message:"Password is required"});
    }
    const same_university=await universityModel.findOne({email})
    if(same_university){
        return res.status(404).send({message:"E-mail already registered"});
    }
    const hashedpassword=await hashedPassword(password)
    const user=await new universityModel({name:name,email:email,password:hashedpassword,location:location}).save()
    return res.status(201).send({
        success:true,
        message:"University Registered Successfully",
        user
    })
    }
    catch(error){
        return res.status(400).send({
            success:false,
            message:"Error in university registration",
            error
        })
    }
}

export const uploadInformation=async(req,res)=>{
    try {
        const { email,dob,block_address }=req.body
        
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in uploading the certificate"
        })
    }
}