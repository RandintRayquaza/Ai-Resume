import userModel from "../models/user.model.js";
import TokenBlacklist from "../models/tokenBlacklist.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isAuthenticated from "../middleware/isAuthenticated.js";


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
    console.log('registerUser - generated token:', token)
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
        console.log('loginUser - generated token:', token)

        res.status(200).json({message:'User logged in successfully',token})
    }
    catch(err) {
        console.log(err)
    }
}


const logoutUser = async (req,res)=>{
    try {
        
        let token = null
        const authHeader = req.headers.authorization || req.headers.Authorization
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1]
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token
        } else if (req.body && req.body.token) {
            token = req.body.token
        }

        if (!token) {
            return res.status(400).json({message:'Token not provided'})
        }

        // persistently blacklist the token
        await TokenBlacklist.create({token})

        // clear token cookie if present
        if (res.clearCookie) res.clearCookie('token')

        return res.status(200).json({message:'User logged out successfully'})
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({message:'Server error'})
    }
}

const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.userId).select('-password')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.status(200).json({ user })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Server error' })
    }
}

export {registerUser, loginUser, logoutUser, getCurrentUser}