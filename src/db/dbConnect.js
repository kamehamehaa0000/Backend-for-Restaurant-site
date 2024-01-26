import mongoose from 'mongoose'
import { dbName } from '../constants.js'

const dbConnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${dbName}`,
      {
        writeConcern: { w: 'majority' },
      }
    )
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    )
  } catch (error) {
    console.log('MONGODB connection FAILED ', error)
    process.exit(1)
  }
}
export default dbConnect
