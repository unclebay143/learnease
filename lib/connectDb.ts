import mongoose from 'mongoose'

mongoose.set('strictQuery', true)
const connectToMongoDb = async () =>
  await mongoose.connect(process.env.MONGODB_URI!)
mongoose.connection.on('connected', () => {
  console.log('Db connected')
})

mongoose.connection.on('disconnected', () => {
  console.log('Db disconnected')
})

export default connectToMongoDb
