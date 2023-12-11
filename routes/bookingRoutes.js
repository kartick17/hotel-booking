const express = require('express')
const { isLoggedIn } = require('../controllers/authController')
const { bookingRoom, myBooking } = require('../controllers/bookingController')

const router = express.Router()

router.post('/:roomId/checkout/:userId', bookingRoom)
router.get('/my-booking/:id', myBooking)

module.exports = router
