const { StatusCodes } = require("http-status-codes");
const Service = require("../application/application.service");
const {status} = require('../../utils/constant')

exports.createApplication = async (req, res, next) => {
  try {
    const application = await Service.createApplication(req.body,req.user);
    res.status(StatusCodes.CREATED).json({ status: status.ONE, message: "Application created", data: application });
  } catch (error) {
    next(error);
  }
};

exports.updateApplication = async (req, res, next) => {
  try {
    const application = await Service.updateApplication(req.params.id, req.body);
    res.status(StatusCodes.OK).json({ status: status.ONE, message: "Application updated successfully", data: application });
  } catch (error) {
    next(error);
  }
};

exports.deleteApplication = async (req, res, next) => {
  try {
    await Service.deleteApplication(req.params.id);
    res.status(StatusCodes.OK).json({ status: status.ONE, message: "Application deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await Service.getAllApplications();
    res.status(StatusCodes.OK).json({ status: status.ONE, message: "All applications fetched", data: applications });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationById = async (req, res, next) => {
  try {
    const application = await Service.getApplicationById(req.params.id);
    res.status(StatusCodes.OK).json({ status: status.ONE, message: "Application fetched", data: application });
  } catch (error) {
    next(error);
  }
};


