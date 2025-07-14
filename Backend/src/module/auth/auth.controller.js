const { StatusCodes } = require("http-status-codes");
const authService = require("./auth.service");
const { status } =require('../../utils/constant');

exports.welcome = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: status.ONE,
    success:status.TRUE,
    message: "Welcome User",
  });
};

exports.signup = async (req, res,next) => {
  try {
    const user = await authService.signupService(req.body);
    return res.status(StatusCodes.CREATED).json({
      status: status.ONE,
      message: "User Signup Successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res,next) => {
  try {
    const user = await authService.loginService(req.body);
    return res.status(StatusCodes.OK).json({
      status: status.ONE,
      success:status.TRUE,
      message: "User Login Successfully",
      data: user
    });
  } catch (error) {
   return next(error);
  }
};
