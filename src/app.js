import express from 'express'
import cors from 'cors'
import dbConnect from './db/dbConnect.js'
import { errorMiddleware } from './util/ApiError.js'
import router from './routes/reservation.route.js'
const app = express()
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['POST'],
    credentials: true,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect()
app.use('/api/v1/reservation', router)
app.use(errorMiddleware)
export { app }
