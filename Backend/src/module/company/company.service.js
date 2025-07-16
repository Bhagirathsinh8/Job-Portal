const { StatusCodes } = require('http-status-codes');
const Company = require('../../model/company.model');
const User = require('../../model/user.model');
const { AppError } = require('../../utils/errorHandler');

//Get All Companies List

exports.getAllCompanies = async (user) => {
  const { role, id } = user;

  let companies;

  if (role === 'recruiter') {
    // Recruiter should only see their own companies
    companies = await Company.find({ ownerId: id }).populate('ownerId', 'name email');
  } else {
    // Admin and student see all companies
    companies = await Company.find().populate('ownerId', 'name email');
  }

  return companies;
};

//Get Company By ID
exports.getCompanyById = async (id) => {
  const company = await Company.findById(id).populate('ownerId', 'name email');
  if (!company) throw new AppError('Company not found', StatusCodes.NOT_FOUND);
  return company;
};

//Create Company
exports.createCompany = async (data,user) => {
 
  const existingCompany = await Company.findOne({
    name: data.name,
    ownerId: user.id,
    // location:data.location
  });

  if (existingCompany) {
    throw new AppError('Company with this name already exists',StatusCodes.CONFLICT);
  }
  const company = new Company({...data,ownerId:user.id});

  await User.findByIdAndUpdate(
    user.id,
    { $set: { company_id: company._id } },
    { new: true }
  );
  return await company.save();
};

//Update Company
exports.updateCompany = async (id, data) => {
  const updated = await Company.findByIdAndUpdate(id, data, { new: true });
  if (!updated) throw new AppError('Company not found', StatusCodes.NOT_FOUND);
  return updated;
};

//Delete Company
exports.deleteCompany = async (id) => {
  const result = await Company.findByIdAndDelete(id);
  if (!result) throw new AppError('Company not found', StatusCodes.NOT_FOUND);
  return;
};




