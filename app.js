const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

const userRouter = require('./routes/userRoutes')

app.use('/api/v1/users', userRouter)

module.exports = app
