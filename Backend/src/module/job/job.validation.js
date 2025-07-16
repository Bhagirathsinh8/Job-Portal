const { body } = require('express-validator');
const { validateRequest, validateRequestID } = require('../../utils/errorHandler');

exports.createJobValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('requirement').notEmpty().withMessage('Requirement is required'),
    body('salary').notEmpty().withMessage('Salary is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('jobType').notEmpty().withMessage('Job Type is required'),
    body('position').isInt({ min: 1 }).withMessage('Position must be a positive integer'),
    body('company').isMongoId().withMessage('Invalid company ID'),
    validateRequest,
];

exports.idValidation = [
    body('id').isMongoId().withMessage("Invalid Job Id"),
    validateRequestID
]



