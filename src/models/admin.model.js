const mongoose = require('mongoose')

const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
})

export const Staff = mongoose.model('Staff', staffSchema)
