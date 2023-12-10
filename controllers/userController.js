const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { User } = require("./../models");
const catchAsync = require("../utils/catchAsync");
// require('dotenv').config()

const createHashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const createJWT = (data) => {
  return JWT.sign({ email: data }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const comparePassword = async (password, dbPassword) => {
  return await bcrypt.compare(password, dbPassword);
};

exports.signup = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password || password !== confirmPassword)
    return res.status(400).json({
      status: false,
      message: "Password and confirm password should be same!",
    });

  req.body.password = await createHashPassword(password);

  const user = await User.create(req.body);

  user.password = undefined;

  res.status(201).json({
    status: true,
    message: user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      status: false,
      message: "All fields are required!",
    });

  const user = await User.findOne({
    where: { email },
    // attributes: ["id", "password", "role"],
  });

  // console.log(user);
  if (!user || !(await comparePassword(password, user.password)))
    return res.status(401).json({
      status: false,
      message: "Invalid email or password!",
    });

  const token = createJWT(email);

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  user.password = undefined;
  res.status(200).json({
    status: true,
    user,
    // token,
  });
});
