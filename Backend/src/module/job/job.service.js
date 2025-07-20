const { StatusCodes } = require("http-status-codes");
const Job = require("../../model/job.model");
const { AppError } = require("../../utils/errorHandler");

exports.createJob = async (jobData,user) => {
  const job = await Job.create({...jobData,created_by:user.id});
  if (!job){
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
