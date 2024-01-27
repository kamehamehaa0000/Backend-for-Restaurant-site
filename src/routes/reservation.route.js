import express from 'express'
import {
  cancelReservation,
  checkReservationByEmail,
  sendReservation,
} from '../controller/reservation.controller.js'
const reservationRouter = express.Router()

reservationRouter.post('/send', sendReservation)
reservationRouter.get('/check/:email', checkReservationByEmail)
reservationRouter.post('/cancel', cancelReservation)

export default reservationRouter
