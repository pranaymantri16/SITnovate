import bcrypt, { hash } from 'bcrypt';
import keccak256 from 'keccak256';
import crypto from "crypto";

export const hashedPassword=async(string)=>{
    try{
        const salt_value=10
        const hashed= await bcrypt.hash(string,salt_value)
        return hashed;
    }
    catch(error){
        console.log("error in password encryption")
        console.log(error)
    }
}

export const checkPassword=async(password1,password2)=>{
    try {
        const value= await bcrypt.compare(password1,password2)
        return value;
    } catch (error) {
        console.log("Error in password decryption")
    }
}

// export const generateHash=async(email, dob)=> {
//     const data = email.trim().toLowerCase() + dob.trim(); // Ensure consistent input format
//     return crypto.createHash("sha256").update(data).digest("hex");
//   }
