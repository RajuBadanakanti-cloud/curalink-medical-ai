import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minLength:1,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    age:{
        type:Number,
        min:1,
        required:true
    },
    gender:{
        type:String,
        enum:["Male", "Female", "Trans"],
        required:true
    },
    condition:{
        type:String,
    },
    location:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const User = mongoose.model("User", userSchema)
export default User