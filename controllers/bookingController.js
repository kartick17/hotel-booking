const { Booking, Room } = require('../models')
const catchAsync = require('../utils/catchAsync')

exports.bookingRoom = catchAsync(async (req, res, next) => {
  req.body.user_id = req.user.id
  req.body.room_id = +req.params.id

  let room = await Room.findByPk(req.body.room_id)

  if (!room)
    return res.status(404).json({
      status: false,
      message: 'No room found with that id',
    })

  const booked = await Booking.create(req.body)

  if (!booked)
    return res.status(400).json({
      status: false,
      message: 'Something went wrong while booking, Please try again later! ',
    })

  room = await room.update({ booked: true })

  res.status(201).json({
    status: true,
    data: {
      booked,
      room,
    },
  })
})

exports.myBooking = catchAsync(async (req, res, next) => {
  const userId = req.params.id

  const bookedRoom = await Booking.findAll({
    where: {
      user_id: userId,
    },
  })

  res.status(200).json({
    status: true,
    lenght: bookedRoom.length,
    data: {
      bookedRoom,
    },
  })
})
