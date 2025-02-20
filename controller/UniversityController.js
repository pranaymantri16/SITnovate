import universityModel from "../models/universityModel.js";
import certificateModel from "../models/certificateModel.js";
import { checkPassword, hashedPassword } from "../Helper/authHelper.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
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


export const loginUniversity=async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email==null){
            return res.status(400).send({message:"Enter correct email!"});
        }
        if(!password){
            return res.status(400).send({message:"Password is required!"});
        }
        const university = await universityModel.findOne({email});
        if(await checkPassword(password,university.password)){
            const token=jwt.sign({_id:university._id},process.env.JWT_SECRET,{expiresIn:'7d'});
            return res.status(201).send({
                success:true,
                message:"User Logged-In Successfully",
                token,
                user:{
                    id:university._id,
                    email:university.email,
                    code:university.uid
                }
            })
        }
        else{
            return res.status(400).send({
                message:"Invalid user email or password"
            })
        }
    }
     catch (error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error in university Sign-in",
            error
        })
    }
}
export const uploadCertificate=async(req,res)=>{
    try {
        const { email,dob,pdfHash,clg_uid}=req.body
        console.log(req.body)
        const certificate= await new certificateModel({clg_uid:clg_uid,email:email,dob:dob,pdfHash:pdfHash}).save()
        return res.status(200).send({
            success:true,
            certificate
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error in uploading the certificate"
        })
    }
}
export const getCertificate=async(req,res)=>{
    try {
        const {email, dob}=req.body
        const certificate= await certificateModel.find({email:email,dob:dob})
        return res.status(200).send({
            success:true,
            message:"getting your certificate",
            certificate
        })

    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in uploading the certificate"
        })
    }
}
