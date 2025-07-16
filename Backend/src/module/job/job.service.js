const { StatusCodes } = require("http-status-codes");
const Job = require("../../model/job.model");
const { AppError } = require("../../utils/errorHandler");

exports.createJob = async (jobData) => {
  const job = await Job.create(jobData);
  if (!job){
      throw new AppError("Job not Created Successfully", StatusCodes.BAD_REQUEST);
  }
  return job;
};

exports.getAllJobs = async () => {
    const job = await Job.find()
    // .populate("company")
    .populate("created_by")
    .populate("applications");
  return job;
};

exports.getJobById = async (id) => {
  const job = await Job.findById(id)
    .populate("company")
    .populate("created_by")
    .populate("applications");
  if (!job) throw new AppError("Job not found",StatusCodes.NOT_FOUND);
  return job;
};

exports.updateJob = async (id, jobData) => {
  const job = await Job.findByIdAndUpdate(id, jobData, { new: true });
  if (!job) throw new AppError("Job not found",StatusCodes.NOT_FOUND);
  return job;
};

exports.deleteJob = async (id) => {
  const job = await Job.findById(id);
  console.log(job);
  if (!job) {
    throw new AppError("Job not found or already deleted", StatusCodes.NOT_FOUND);
  }

  await job.deleteOne();
  return;
};
