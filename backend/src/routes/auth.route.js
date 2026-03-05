import { Router } from "express";
import { registerUser, loginUser, logoutUser ,getCurrentUser } from "../controllers/auth.controllers.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', logoutUser)

/**
 * GET /me - Retrieve current authenticated user information
 */
authRouter.get('/me', isAuthenticated, getCurrentUser)

export default authRouter