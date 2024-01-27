import express from 'express'
import {
  addStaff,
  deleteStaff,
  getAllStaff,
  getStaffByEmail,
} from '../controller/staff.controller.js'
import { verifyAdminToken } from '../controller/admin.controller.js'

const staffRouter = express.Router()
staffRouter.post('/add-staff', verifyAdminToken, addStaff)
staffRouter.get('/all-staff', getAllStaff)
staffRouter.get('/:email', getStaffByEmail)
staffRouter.delete('/:email', verifyAdminToken, deleteStaff)

export default staffRouter
