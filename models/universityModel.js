import mongoose from 'mongoose';

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'University name is required'],
    trim: true,
  },
  uid: {
    type: String,
    unique: true,
    default: () => Math.random().toString(36).substring(2, 8).toUpperCase(),
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  email:{
    type:String,
    required:true,
    unique:true
    },
  password:{
    type:String,
    required:true,
    }
}, 
{timestamps: true});


export default mongoose.model('universityModel',universitySchema);