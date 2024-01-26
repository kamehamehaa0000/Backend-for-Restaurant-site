import express from 'express'
import {
  cancelReservation,
  sendReservation,
} from '../controller/reservation.controller.js'
const reservationRouter = express.Router()
reservationRouter.post('/send', sendReservation)
reservationRouter.post('/cancel', cancelReservation)
export default reservationRouter
