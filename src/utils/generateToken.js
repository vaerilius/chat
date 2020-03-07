import jwt from 'jsonwebtoken'

export const generateToken = userId =>
  jwt.sign({ userId }, process.env.NODE_SECRET, { expiresIn: '7 day' })
