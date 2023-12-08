const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')
const roomRouter = require('./routes/roomRoutes')

app.use('/api/v1/users', userRouter)
app.use('/api/v1/rooms', roomRouter)

module.exports = app
