const { StatusCodes } = require("http-status-codes");
const Job = require("../../model/job.model");
const Company = require("../../model/company.model");
const { AppError } = require("../../utils/errorHandler");
const Application = require("../../model/application.model") ;



exports.createJob = async (jobData, user) => {

  // const company = await Company.findOne({ ownerId: user.id });
  const company = await Company.findOne({
    _id: jobData.companyId,
    ownerId: user.id,
  });
  if (!company) {
    throw new AppError("No company found for this user", StatusCodes.NOT_FOUND);
  }
  const job = await Job.create({
    ...jobData,
    company: company._id, // set company from user's ownership
    created_by: user.id,
  });

  if (!job) {
    throw new AppError("Job not Created Successfully", StatusCodes.BAD_REQUEST);
  }

  return job;
};


exports.getAllJobs = async (query) => {
  const filter = {};

  // 🔍 Filtering
  if (query.title) {
    filter.title = { $regex: query.title, $options: "i" };
  }
  if (query.location) {
    filter.location = { $regex: query.location, $options: "i" };
  }
  if (query.type) {
    filter.type = query.type;
  }
  if (query.minSalary && query.maxSalary) {
    filter.salary = { $gte: query.minSalary, $lte: query.maxSalary };
  }

  // ↕️ Sorting
  let sort = {};
  if (query.sortBy) {
    const sortField = query.sortBy; // e.g., "createdAt"
    const sortOrder = query.order === "desc" ? -1 : 1; // default: ascending
    sort[sortField] = sortOrder;
  } else {
    sort = { createdAt: -1 }; // default sorting by newest jobs
  }

  // 📦 Fetch Jobs
  const jobs = await Job.find(filter)
    .sort(sort)
    .populate("company")
    .populate("created_by")
    .populate("applications")
    .lean();

  return jobs;
};

exports.getJobById = async (id) => {
  const job = await Job.findById(id)
    .populate("company")
    .populate("created_by")
    .populate("applications");
  if (!job) throw new AppError("Job not found", StatusCodes.NOT_FOUND);
  return job;
};

exports.updateJob = async (id, jobData) => {
  const job = await Job.findByIdAndUpdate(id, jobData, { new: true });
  if (!job) throw new AppError("Job not found", StatusCodes.NOT_FOUND);
  return job;
};

exports.deleteJob = async (id) => {
  const job = await Job.findByIdAndDelete(id);
  if (!job) {
    throw new AppError(
      "Job not found or already deleted",
      StatusCodes.NOT_FOUND
    );
  }

  return;
};

exports.getJobsByRecruiter = async (recruiterId) => {
  const job = await Job.find({ created_by: recruiterId })
    .sort({ createdAt: -1 })
    .populate("company")
    .populate("created_by")
    .populate("applications")
    .lean();
  return job;
};


exports.getJobApplicantsService = async (jobId) => {
  // Check if job exists
  const job = await Job.findById(jobId);
  if (!job) {
    throw new Error("Job not found");
  }

  // Get all applications for the job
  const applications = await Application.find({ jobId: jobId })
  .populate("applicant_id") // populate only specific fields
  .sort({ createdAt: -1 });

  return applications;
};
