import otpGenerator from 'otp-generator'
import otpModel from '../models/otpModel.js'



export const generateotp=async(email)=>{
    try{
    const otp=otpGenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
    const OTP=new otpModel({email:email,otp:otp}).save()
    return otp;
    }
    catch(error){
        console.log("Error in OTP creation")
    }
} 
export const verifyotp=async(email,otp)=>{
    try {
        const user=await otpModel.findOne({email:email,otp:otp}).exec()
        if(!user){
            console.log("Error in finding OTP")
            return false
        }
        if(otp==user.otp){
            console.log("OTP Verified Successfully")
            return true
        }
        else{
            console.log("Invalid OTP")
            return false
        }
    } catch (error) {
        console.log(error)
        console.log("Error in OTP verification")
    }
}