const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
const { User } = require('./../models')
// require('dotenv').config()

const createHashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const createJWT = (id) => {
  console.log(process.env.JWT_SECRET)
  return JWT.sign(id, process.env.JWT_SECRET)
}

const comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword)
}

exports.signup = async (req, res, next) => {
  const { name, email, password, mobile_no, confirmPassword } = req.body

  if (!password || password !== confirmPassword)
    return res.status(400).json({
      status: false,
      message: 'Password and confirm password should be same!',
    })

  const hashPassword = await createHashPassword(password)

  const user = await User.create({
    name,
    email,
    password: hashPassword,
    mobile_no,
  })

  res.status(201).json({
    status: true,
    message: user,
  })
}

exports.login = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).json({
      status: false,
      message: 'All fields are required!',
    })

  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'password'],
  })

  if (!user || !(await comparePassword(password, user.password)))
    return res.status(401).json({
      status: false,
      message: 'Invalid email or password!',
    })

  const token = createJWT(user.id)

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })

  res.status(200).json({
    status: true,
    data: token,
  })
}
