import { Reservation } from '../models/reservation.model.js'
import ApiError from '../util/ApiError.js'
import { asyncHandler } from '../util/asyncHandler.js'

const sendReservation = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, date, time } = req.body
  if (!firstName || !lastName || !email || !phone || !date || !time) {
    return next(new ApiError(404, 'Please fill all the fields'))
  }
  try {
    const reservation = await Reservation.create({
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
    })
    return res
      .status(200)
      .json({ success: 200, message: 'Reservation done successfully' })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const ValidationErrors = Object.values(error.errors).map(
        (err) => err.message
      )
      return next(new ApiError(400, ValidationErrors.join(' , ')))
    }
    return next(error)
  }
})
//extra functionality
const cancelReservation = asyncHandler(async (req, res, next) => {
  const { email, phone } = req.body
  if (!email) {
    return next(new ApiError(404, 'Enter email '))
  }
  try {
    const deletedReservation = await Reservation.findOneAndDelete({
      email,
    })
    console.log(deletedReservation)
    if (deletedReservation) {
      return res
        .status(200)
        .json({ success: true, message: 'Reservation canceled' })
    } else {
      // Handle the case where no reservation is found with the specified email
      return res
        .status(404)
        .json({ success: false, message: 'Reservation not found' })
    }
  } catch (error) {
    // Handle the error, such as logging or sending an error response
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' })
  }
})
export { sendReservation, cancelReservation }
