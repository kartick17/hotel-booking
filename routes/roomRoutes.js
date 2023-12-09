const express = require('express')
const roomController = require('../controllers/roomController')
const authController = require('../controllers/authController')

const router = express.Router()

router.use(authController.isLoggedIn, authController.restrictTo('owner'))

router
  .route('/:id')
  .get(roomController.getOneRoom)
  .patch(roomController.updatedRoom)

router.post(
  '/add-room',
  roomController.upload.single('image'),
  roomController.addRoom
)

router.get('/all-rooms', roomController.getAllRooms)

module.exports = router
