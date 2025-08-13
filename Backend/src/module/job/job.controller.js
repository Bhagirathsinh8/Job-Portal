const { StatusCodes } = require("http-status-codes");
const jobService = require("../job/job.service");
const { status } = require("../../utils/constant");

exports.createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body,req.user);

     // ✅ Emit job-added event via Socket.IO
    const io = req.app.get('io');
    io.emit('job-added', job); // Broadcast to all connected clients
    
    return res
      .status(StatusCodes.CREATED)
      .json({
        status: status.ONE,
        success:status.TRUE,
        message: "Job created successfully",
        data: job,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs(req.query);
    return res
      .status(StatusCodes.OK)
      .json({
        status: status.ONE,
        success:status.TRUE,
        message: "Job Fetch successfully",
        data: jobs,
      });
  } catch (error) {
    next(error);
  }
};

exports.getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    return res
      .status(StatusCodes.OK)
      .json({
        status: status.ONE,
        success: status.TRUE,
        message: "Job Fetch successfully",
        data: job,
      });
  } catch (error) {
    next(error);
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await jobService.updateJob(jobId, req.body);
    return res
      .status(StatusCodes.OK)
      .json({
        status: status.ONE,
        message: "Job updated successfully",
        data: job,
      });
  } catch (error) {
    next(error);
  }
};

exports.deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const job = await jobService.deleteJob(jobId);
   
    return res
      .status(StatusCodes.OK)
      .json({ status: status.ONE,success:status.TRUE,message: "Job deleted successfully"});
  } catch (error) {
    next(error);
  }
};



exports.getRecruiterJobs = async (req, res, next) => {
  try {
    const user = req.user.id
    const jobs = await jobService.getJobsByRecruiter(user);
    res.status(StatusCodes.OK).json({
      status: status.ONE,
      success:status.TRUE,
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};



exports.getJobApplicants = async (req, res,next) => {
  try {
    const { jobId } = req.params;

    const result = await jobService.getJobApplicantsService(jobId);

    return res.status(StatusCodes.OK).json({
      status:status.ONE,
      success:status.TRUE,
      message:"Get Job Applicant list Successfully",
      data:result
    })
  } catch (error) {
      return next(error);
    }
};
