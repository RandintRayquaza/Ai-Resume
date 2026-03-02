import userModel from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



const registerUser = async (req,res)=>{
   try {
    const {username, email, password} = req.body


    if (!username || !email || !password) {
        return res.status(400).json({message:'All fields are required'})
    }

    const isUserExist = await userModel.findOne({$or:[{username},{email}]})

    if (isUserExist) {
        return res.status(400).json({message:'User already exists'})
    }
    
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({username,email,password:hash})

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'})

    res.status(201).json({message:'User registered successfully',token})
   }
   catch(err) {
    console.log(err)
   }

}


const loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body

        if (!email || !password) {
            return res.status(400).json({message:'All fields are required'})
        }

        const user = await userModel.findOne({email})

        if (!user) {
            return res.status(400).json({message:'Invalid credentials'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message:'Invalid credentials'})
        }

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1h'})

        res.status(200).json({message:'User logged in successfully',token})
    }
    catch(err) {
        console.log(err)
    }
}


const logoutUser = async (req,res)=>{
    // try {
        
    // }
}



export {registerUser, loginUser, logoutUser}