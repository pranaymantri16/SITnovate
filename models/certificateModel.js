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
    pdfHash:{
        type:String,
    }
},{timestamps:true})

export default mongoose.model("certiModel",certificateModel);