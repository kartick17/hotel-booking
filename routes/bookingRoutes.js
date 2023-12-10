const express = require('express')
const { isLoggedIn } = require('../controllers/authController')
const { bookingRoom, myBooking } = require('../controllers/bookingController')

const router = express.Router()

router.post('/:id/checkout', isLoggedIn, bookingRoom)
router.get('/my-booking', isLoggedIn, myBooking)

module.exports = router
