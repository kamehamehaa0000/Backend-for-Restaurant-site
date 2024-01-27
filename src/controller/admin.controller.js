import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Admin from '../models/admin.model.js'
import ApiError from '../util/ApiError.js'

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const generateToken = (admin) => {
  return jwt.sign({ username: admin.username }, JWT_SECRET_KEY, {
    expiresIn: '1h',
  })
}
export const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const admin = await Admin.findOne({ username })
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      })
    }
    if (
      username !== admin.username ||
      !bcrypt.compareSync(password, admin.password)
    ) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' })
    }

    const token = generateToken(admin)
    res.status(200).json({ success: true, token })
  } catch (error) {
    return next(error)
  }
}

export const verifyAdminToken = (req, res, next) => {
  const token = req.header('Authorization') || req.body.token

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Token not provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY)
    req.admin = decoded // Attach decoded admin information to the request object
    next()
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}
