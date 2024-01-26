import mongoose, { Schema } from 'mongoose'
import validator from 'validator'
const reservationSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: [3, "First name can't be smaller than 3 character"],
      maxLength: [40, "First name can't be greater than 40 Character"],
    },
    lastName: {
      type: String,
      required: true,
      maxLength: [40, "last name can't be greater than 40 Character"],
    },
    email: {
      type: String,
      validate: [validator.isEmail, 'Provide a Valid email address'],
    },
    phone: {
      type: String,
      required: true,

      maxLength: [10, 'Phone number should be of 10 digits'],
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
export const Reservation = mongoose.model('Reservation', reservationSchema)
