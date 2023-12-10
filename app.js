const express = require('express')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/userRoutes')
const roomRouter = require('./routes/roomRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const globalErrorHandeler = require('./controllers/errorController')

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/rooms', roomRouter)
app.use('/api/v1/booking', bookingRouter)

app.use(globalErrorHandeler)

module.exports = app
