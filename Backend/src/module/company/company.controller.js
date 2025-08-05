const { StatusCodes } = require('http-status-codes');
const Service = require('./company.service');
const { status } = require('../../utils/constant');

exports.createCompany = async (req, res, next) => {
  try {
    const company = await Service.createCompany(req.body,req.user);
    return res.status(StatusCodes.CREATED).json({ status: status.ONE,success:status.TRUE, message: 'Company created successfully', data: company });
  } catch (error) {
    next(error);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const companyId = req.params.id;
    const data = req.body;
    const file = req.file;

    const company = await Service.updateCompany(companyId, data, file);
    return res.status(StatusCodes.OK).json({ status: status.ONE,success:status.TRUE, message: 'Company updated successfully', data: company });
  } catch (error) {
    next(error);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const deleteCompany = await Service.deleteCompany(req.params.id);
    return res.status(StatusCodes.OK).json({ status: status.ONE,success:status.TRUE, message: 'Company deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getCompanyById = async (req, res, next) => {
  try {
    const company = await Service.getCompanyById(req.params.id);
    return res.status(StatusCodes.OK).json({ status: status.ONE,success:status.TRUE,message:"Get Company By Id Successfully", data: company });
  } catch (error) {
    next(error);
  }
};

exports.getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Service.getAllCompanies(req.user);
    return res.status(StatusCodes.OK).json({ status: status.ONE,success:status.TRUE,message:"All Company Data Fetch Successfully", data: companies });
  } catch (error) {
    next(error);
  }
};
