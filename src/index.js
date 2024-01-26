import express from 'express'
import dotenv from 'dotenv'
import { app } from './app.js'
import cors from 'cors'
dotenv.config({
  path: './.env',
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Service is running on PORT ', process.env.PORT)
})
