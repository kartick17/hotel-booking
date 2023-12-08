const express = require('express')
const roomController = require('../controllers/roomController')

const router = express.Router()

router.post(
  '/add-room/:id',
  roomController.upload.single('image'),
  roomController.addRoom
)

router.get('/all-rooms/:id', roomController.getAllRooms)

module.exports = router
