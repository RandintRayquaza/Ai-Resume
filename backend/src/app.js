import express from 'express'
import authRouter from './routes/auth.route.js'
import cors from 'cors'

const app = express()

const configuredOrigins = [process.env.CLIENT_URL, process.env.VITE_CLIENT_URL]
    .filter(Boolean)
    .flatMap((value) => value.split(','))
    .map((value) => value.trim().replace(/\/$/, ''))

const isCodespacesOrigin = (origin) =>
    /^https:\/\/[a-z0-9-]+\.app\.github\.dev$/i.test(origin)

const isLocalDevOrigin = (origin) =>
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)

app.use(cors({
    origin(origin, callback) {
        // Allow tools like curl/postman that do not send an Origin header.
        if (!origin) return callback(null, true)

        const normalizedOrigin = origin.replace(/\/$/, '')
        const isConfigured = configuredOrigins.includes(normalizedOrigin)

        if (isConfigured || isCodespacesOrigin(normalizedOrigin) || isLocalDevOrigin(normalizedOrigin)) {
            return callback(null, true)
        }

        return callback(new Error(`Origin not allowed by CORS: ${origin}`))
    },
    credentials: true
}))
app.use(express.json())

app.use('/api/auth',authRouter)



export default app