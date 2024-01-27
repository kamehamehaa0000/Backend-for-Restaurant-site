import express from 'express'
import {
  addStaff,
  deleteStaff,
  getAllStaff,
  getStaffByEmail,
} from '../controller/staff.controller.js'

const staffRouter = express.Router()
staffRouter.post('/add-staff', addStaff)
staffRouter.get('/all-staff', getAllStaff)
staffRouter.get('/:email', getStaffByEmail)
staffRouter.delete('/:email', deleteStaff)

export default staffRouter
