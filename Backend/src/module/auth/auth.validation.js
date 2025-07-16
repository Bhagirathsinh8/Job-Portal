const { body } = require('express-validator');
const { validateRequest } = require('../../utils/errorHandler');

exports.signupValidator = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number'),

  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['student', 'recuiter', 'admin']).withMessage('Role must be student, recuiter, or admin'),
    validateRequest
];

exports.loginValidator = [
    body('email')
    .notEmpty().withMessage("Email is Required")
    .isEmail().withMessage('Invalid email format'),

    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['student', 'recuiter', 'admin']).withMessage('Role must be student, recuiter, or admin'),
    validateRequest
];

