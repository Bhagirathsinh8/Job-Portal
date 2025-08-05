const express = require('express');
const router = express.Router();
const Controller = require('../module/job/job.controller');
const Validator = require('../module/job/job.validation');
const { verifyToken, roleMiddleware } = require('../middleware/auth.middleware');


// Get all jobs
router.get('/', Controller.getAllJobs);
router.get("/recruiter/my-jobs",verifyToken,roleMiddleware(['recuiter']), Controller.getRecruiterJobs);

// Get job by ID
router.get('/:id',Validator.idValidation, Controller.getJobById);

// Create job
router.post('/add',verifyToken,roleMiddleware(['recuiter']), Validator.createJobValidator, Controller.createJob);

// Update job
router.put('/:id', Controller.updateJob);

// Delete job
router.delete('/:id', Controller.deleteJob);

module.exports = router;
