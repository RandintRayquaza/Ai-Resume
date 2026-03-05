import mongoose from 'mongoose'

const tokenBlacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  blacklistedAt: {
    type: Date,
    default: Date.now
  }
})

const TokenBlacklist = mongoose.model('tokenblacklists', tokenBlacklistSchema)

export default TokenBlacklist
