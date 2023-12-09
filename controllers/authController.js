const jwt = require('jsonwebtoken')
const { User } = require('../models')

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // console.log(req.user)
    if (!roles.includes(req.user.role))
      return res.status(403).json({
        status: false,
        message: 'You do not have to permission to perform this action',
      })
    next()
  }
}

exports.isLoggedIn = async (req, res, next) => {
  let token
  if (req?.cookies.jwt) token = req.cookies.jwt

  if (!token)
    return res.status(401).json({
      status: false,
      message: 'You are not logged in! Please login to get access!!',
    })

  const decode = jwt.verify(token, process.env.JWT_SECRET)
  // console.log(decode.email)

  const currentUser = await User.findOne({
    where: {
      email: decode.email,
    },
    attributes: ['id', 'name', 'email', 'mobile_no', 'role'],
  })

  if (!currentUser)
    return res.status(401).json({
      status: false,
      message: 'The user belonging to this token is no longer exists!!',
    })

  req.user = currentUser.dataValues
  next()
}
