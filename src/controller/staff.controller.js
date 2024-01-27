import ApiError from '../util/ApiError.js'
import { asyncHandler } from '../util/asyncHandler.js'
import { Staff } from '../models/staff.model.js'

// @desc      Add a new staff member
// @route     POST /api/v1/admin/staff
export const addStaff = asyncHandler(async (req, res, next) => {
  const { name, role, email, joiningDate } = req.body
  if (!name || !role | !email | !joiningDate) {
    throw new ApiError(404, 'all the field')
  }
  try {
    const newStaff = new Staff({
      name,
      role,
      email,
      joiningDate,
    })
    const savedStaff = await newStaff.save()
    return res.status(201).json({
      success: true,
      message: 'Staff member added successfully',
      data: savedStaff,
    })
  } catch (error) {
    return next(new ApiError(500, 'Error in Registering Staff member'))
  }
})

// @desc      Delete a staff member by email
// @route     DELETE /api/v1/admin/staff/:email

export const deleteStaff = asyncHandler(async (req, res, next) => {
  const { email } = req.params
  try {
    const deletedStaff = await Staff.findOneAndDelete({ email })

    if (!deletedStaff) {
      return next(new ApiError(404, 'Staff member not found'))
    }

    return res.status(200).json({
      success: true,
      message: 'Staff member deleted successfully',
      data: deletedStaff,
    })
  } catch (error) {
    return next(new ApiError(500, `error deleting the staff ${error.message}`))
  }
})

// @desc      Retrieve a single staff member by email
// @route     GET /api/v1/admin/staff/:email

export const getStaffByEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.params

  try {
    const staff = await Staff.findOne({ email })

    if (!staff) {
      return next(new ApiError(404, 'Staff member not found'))
    }

    res.status(200).json({
      success: true,
      data: staff,
    })
  } catch (error) {
    return next(new ApiError(500, `error getting the staff ${error.message}`))
  }
})

// @desc      Retrieve all staff members
// @route     GET /api/v1/admin/staff

export const getAllStaff = asyncHandler(async (req, res, next) => {
  const staffMembers = await Staff.find()

  res.status(200).json({
    success: true,
    data: staffMembers,
  })
})
