import express from 'express'
import cors from 'cors'
import dbConnect from './db/dbConnect.js'
import { errorMiddleware } from './util/ApiError.js'
import staffRouter from './routes/staff.route.js'
import reservationRouter from './routes/reservation.route.js'
const app = express()
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['POST', 'GET', 'DELETE'],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()
app.use('/api/v1/reservation', reservationRouter)
app.use('/api/v1/admin/staff', staffRouter)
app.use(errorMiddleware)
export { app }
