import express from 'express'
import { loginAdmin, verifyAdminToken } from '../controller/admin.controller.js'

const adminRouter = express.Router()

// Route to login as admin
adminRouter.post('/login', loginAdmin)

export default adminRouter
