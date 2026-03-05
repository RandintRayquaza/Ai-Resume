import jwt from 'jsonwebtoken'
import TokenBlacklist from '../models/tokenBlacklist.model.js'

const isAuthenticated = async (req, res, next) => {
    try {
        // gather token from common locations
        let token = req.cookies?.token || req.headers.authorization || req.body?.token

        // Log raw incoming token for debugging
        console.log('isAuthenticated - raw token/header:', token)

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' })
        }

        // normalize: handle "Bearer <token>" if present
        if (typeof token === 'string' && token.toLowerCase().startsWith('bearer ')) {
            token = token.split(' ')[1]
        }

        console.log('isAuthenticated - normalized token:', token)

        const blacklisted = await TokenBlacklist.findOne({ token })
        if (blacklisted) {
            console.log('isAuthenticated - token is blacklisted')
            return res.status(401).json({ message: 'Token is invalid' })
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('isAuthenticated - token decoded:', decoded)
            req.user = decoded
            return next()
        } catch (verifyError) {
            console.log('isAuthenticated - jwt.verify error:', verifyError.message)
            return res.status(401).json({ message: 'Invalid token, authorization denied' })
        }
    } catch (error) {
        console.log('isAuthenticated - unexpected error:', error)
        return res.status(401).json({ message: 'Invalid token, authorization denied' })
    }
}


export default isAuthenticated