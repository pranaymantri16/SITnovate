import mongoose from "mongoose";

const studModel=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
        },
      password:{
        type:String,
        required:true,
        }
},{timestamps:true})

export default mongoose.model("studModel",studModel);