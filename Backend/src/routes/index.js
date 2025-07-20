const express = require('express');
const router = express.Router();

// Import all route files
// const userRoutes = require('./user.routes');
const tempRoutes = require('./temp.routes');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const jobRoutes = require('./job.routes');
const companyRoutes = require('./company.routes');
const applicationRoutes = require("./application.routes");


// Define the base route for user-related operations
// Example: router.use('/users', userRoutes);

router.use('/temp', tempRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/job', jobRoutes);
router.use('/company', companyRoutes);
router.use('/applications', applicationRoutes)

module.exports = router;
