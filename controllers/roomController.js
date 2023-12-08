const { Room, User } = require('../models')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/img/rooms')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

exports.upload = multer({ storage: storage })

exports.addRoom = async (req, res, next) => {
  req.body.image = req.file.originalname
  req.body.owner_id = req.params.id

  const newRoom = await Room.create(req.body)

  res.status(201).json({
    status: true,
    data: {
      newRoom,
    },
  })
}

exports.getAllRooms = async (req, res, next) => {
  const rooms = await Room.findAll({
    include: [
      {
        model: User,
        // as: 'userDetails',
        attributes: ['name', 'email', 'mobile_no'],
      },
    ],
    where: {
      owner_id: req.params.id,
    },
  })

  res.status(200).json({
    status: true,
    length: rooms.length,
    data: {
      rooms,
    },
  })
}
