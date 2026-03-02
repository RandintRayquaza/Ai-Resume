import mongoose from "mongoose";


const userSchmea = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'username already taken'],
        required:true,
    },
    email:{
        type:String,
        unique:[true,'account already exist with this email'],
        required:true,
    },
    password:{
        type:String,
         required:true
    }
},
{
    timestamps:true
})

const userModel = mongoose.model('users', userSchmea)

export default userModel