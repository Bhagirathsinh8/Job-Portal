const { StatusCodes } = require("http-status-codes");
const authService = require("./auth.service");
const { status } = require("../../utils/constant");

exports.welcome = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: status.ONE,
    success: status.TRUE,
    message: "Welcome User",
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await authService.signupService(req.body,req.file);
    return res.status(StatusCodes.CREATED).json({
      status: status.ONE,
      message: "User Signup Successfully",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await authService.loginService(req.body);

    //in Future need to store in cookie

    //  return res.cookie('token', user.token, {
    //     httpOnly: true,
    //     secure: false,
    //     sameSite: 'Lax',
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    //   });

    // use logout route and unset
    // res.clearCookie('token'); // Clear the 'token' cookie

    return res.status(StatusCodes.OK).json({
      status: status.ONE,
      success: status.TRUE,
      message: "User Login Successfully",
      data: user,
    });

  } catch (error) {
    return next(error);
  }
};
