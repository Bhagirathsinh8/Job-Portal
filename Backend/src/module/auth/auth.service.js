const User = require("../../model/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AppError } = require("../../utils/errorHandler");
const { StatusCodes } = require('http-status-codes');
const { serverConfig } = require("../../utils/constant");

//Signup User
exports.signupService = async (data) => {
  const { name, email, phone, role, password } = data;

  const userExists = await User.findOne({ $or: [{ email }, { phone }] });
  if (userExists) {
    if (userExists.email === email) {
      throw new AppError("Email is already registered",StatusCodes.CONFLICT);
    } else if (userExists.phone === phone) {
      throw new AppError("Phone number is already registered",StatusCodes.CONFLICT);
    } else {
      throw new AppError("User already exists",StatusCodes.CONFLICT);
    }
  }
  const newUser = new User({ name, email, phone, role, password });
  const user = await newUser.save();
  return user;
};

//Login User
exports.loginService = async (data) => {
  const { email, password, role } = data;

  const filter = {};
  if (email) filter.email = email;

  const user = await User.findOne(filter).select("+password");
  if (!user) {
    throw new AppError("User Not Found",StatusCodes.BAD_REQUEST);
  }

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    throw new AppError("Invalid Credentials",StatusCodes.UNAUTHORIZED);
  }

  if (user.role !== role) {
    throw new AppError("Current User Role is unmatch",StatusCodes.FORBIDDEN);
  }
  const token = jwt.sign({id:user._id,role:user.role}, serverConfig.JWT_SECRET_KEY, {expiresIn:"30d"});

  return {token,user};
};

