const { StatusCodes } = require("http-status-codes");
const Application = require("../../model/application.model");
const Job = require("../../model/job.model");
const { AppError } = require("../../utils/errorHandler");
const { models } = require("../../utils/constant");

exports.createApplication = async (data, user) => {
  const job = await Job.findById(data.jobId);
  if (!job) {
    throw new AppError("Job not found", StatusCodes.NOT_FOUND);
  }

  const existing = await Application.findOne({
    jobId: data.jobId,
    applicant_id: user.id,
  });
  if (existing) {
    throw new AppError(
      "You have already applied for this job.",
      StatusCodes.CONFLICT
    );
  }

  data.applicant_id = user.id;
  const application_data = new Application(data);
  const application = await application_data.save();

  await Job.findByIdAndUpdate(
    data.jobId,
    { $push: { applications: application._id } },
    { new: true }
  );

  return application;
};

exports.updateApplication = async (id, data) => {
  const application = await Application.findByIdAndUpdate(id, data, {
    new: true,
  });
  return application;
};

exports.deleteApplication = async (id) => {
  const application = await Application.findById(id);

  if (!application) {
    throw new AppError("Application not found", StatusCodes.NOT_FOUND);
  }

  const jobId = application.jobId;

  await Application.findByIdAndDelete(id);

  await Job.findByIdAndUpdate(
    jobId,
    { $pull: { applications: id } },
    { new: true }
  );

  return application;
};

exports.getAllApplications = async () => {
  const applications = await Application.find().populate("jobId applicant_id").lean();
  return applications;
};

exports.getApplicationById = async (id) => {
  const application = await Application.findById(id).populate("jobId userId").lean();

  if(!application){
    throw new AppError("Application Not Found",StatusCodes.NOT_FOUND);
  }

  return application;
};


exports.updateApplicationStatusService = async (applicationId, status) => {
  // Allowed statuses
  const validStatuses = ["pending", "shortlisted", "interview", "hired", "rejected","accepted"];
  if (!validStatuses.includes(status)) {
    throw new AppError("Invalid status value",StatusCodes.BAD_REQUEST);
  }

  const updatedApplication = await Application.findByIdAndUpdate(
    applicationId,
    { status },
    { new: true }
  );

  if (!updatedApplication) {
    throw new AppError("Application not found",StatusCodes.BAD_REQUEST);
  }

  return updatedApplication;
};

exports.getUserApplications = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [applications, total] = await Promise.all([
    Application.find({ applicant_id: userId }) // use applicant_id from your schema
      .populate({
    path: "jobId",
    populate: {
      path: "company",
      model: models.COMPANY,
      select: "name location website logo", // only return needed fields
    },
  })
      .populate("applicant_id", "name email")      // populate applicant details (optional)
      
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }), // latest first
    Application.countDocuments({ applicant_id: userId })
  ]);

  return {
    applications,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};
