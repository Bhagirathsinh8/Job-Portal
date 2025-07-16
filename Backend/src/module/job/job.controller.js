const { StatusCodes } = require("http-status-codes");
const jobService = require("../job/job.service");
const { status } = require("../../utils/constant");

exports.createJob = async (req, res, next) => {
  try {
    const job = await jobService.createJob(req.body,req.user);
    return res
      .status(StatusCodes.CREATED)
      .json({
        status: status.ONE,
        message: "Job created successfully",
        data: job,
      });
  } catch (error) {
    next(error);
  }
};

exports.getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobService.getAllJobs();
    return res
      .status(StatusCodes.OK)
      .json({
        status: status.ONE,
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
      .json({ status: status.ONE, message: "Job deleted successfully"});
  } catch (error) {
    next(error);
  }
};
