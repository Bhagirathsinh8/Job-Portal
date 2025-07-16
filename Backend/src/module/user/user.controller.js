const { StatusCodes } = require('http-status-codes');
const userService = require('./user.service');
const { status } = require('../../utils/constant');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.status(StatusCodes.OK).json({
      status: status.ONE,
      message: "Profile fetched successfully",
      data: user
    });
  } catch (error) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.status(StatusCodes.OK).json({
      status: status.ONE,
      message: "Profile updated successfully",
      data: user
    });
  } catch (error) {
    next(err);
  }
};
