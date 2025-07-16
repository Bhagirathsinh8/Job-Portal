const jwt = require('jsonwebtoken');
const User = require('../model/user.model');
const { StatusCodes } = require('http-status-codes');
const { serverConfig } = require('../utils/constant');

const roleMiddleware = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Permission denied' });
  }
  next();
};

const verifyToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Access Denied. No token provided!' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'User not found' });
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    };

    // eslint-disable-next-line callback-return
    next();

    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid Token!' });
  }
};

module.exports = { verifyToken, roleMiddleware };
