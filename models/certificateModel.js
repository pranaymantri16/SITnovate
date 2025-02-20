import mongoose from "mongoose";

const certificateModel=new mongoose.Schema({
    clg_uid: {
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    block_address:{
        type:String,
        required:true
    }
},{timestamps:true})

export default mongoose.model("certiModel",certificateModel);