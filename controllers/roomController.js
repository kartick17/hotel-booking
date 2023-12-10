const multer = require('multer')
const { Room, User } = require('../models')
const catchAsync = require('../utils/catchAsync')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/rooms')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

exports.upload = multer({ storage: storage })

exports.addRoom = catchAsync(async (req, res, next) => {
  req.body.image = req.file.originalname
  req.body.owner_id = req.user.id

  req.body.category = req.body.category.toLowerCase()
  req.body.bed_type = req.body.bed_type.toLowerCase()
  req.body.room_type = req.body.room_type.toLowerCase()
  req.body.location = req.body.location.toLowerCase()

  const newRoom = await Room.create(req.body)

  res.status(201).json({
    status: true,
    data: {
      newRoom,
    },
  })
})

exports.getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.findAll({
    include: [
      {
        model: User,
        // as: 'userDetails',
        attributes: ['name', 'email', 'mobile_no'],
      },
    ],
    where: req.query,
  })

  res.status(200).json({
    status: true,
    length: rooms.length,
    rooms,
  })
})

exports.getOneRoom = catchAsync(async (req, res, next) => {
  const room = await Room.findOne({
    where: {
      id: req.params.id,
    },
  })

  if (!room)
    return res.status(404).json({
      status: false,
      message: 'No room found with that id',
    })

  res.status(200).json({
    status: true,
    data: {
      room,
    },
  })
})

exports.updatedRoom = catchAsync(async (req, res, next) => {
  const id = req.params.id
  const room = await Room.findByPk(id)

  if (!room)
    return res.status(404).json({
      status: false,
      message: 'No room found with that id',
    })

  const updatedRoom = await room.update(req.body)

  res.status(200).json({
    status: true,
    data: {
      updatedRoom,
    },
  })
})

exports.removeRoom = catchAsync(async (req, res, next) => {
  const room = await Room.destroy({
    where: {
      id: req.params.id,
    },
  })

  console.log(room)

  if (!room)
    return res.status(404).json({
      status: false,
      message: 'No room found with that id',
    })

  res.status(204).json({
    status: true,
    data: null,
  })
})

exports.getRoomsByOwner = catchAsync(async (req, res, next) => {
  const rooms = await Room.findAll({
    include: [
      {
        model: User,
        // as: 'userDetails',
        attributes: ['name', 'email', 'mobile_no'],
      },
    ],
    where: {
      owner_id: req.user.id,
    },
  })

  res.status(200).json({
    status: true,
    length: rooms.length,
    data: {
      rooms,
    },
  })
})
