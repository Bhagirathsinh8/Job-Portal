const User = require("../../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AppError } = require("../../utils/errorHandler");
const { StatusCodes } = require("http-status-codes");
const { serverConfig } = require("../../utils/constant");
const cloudinary = require("../../utils/cloudinary");
const streamifier = require("streamifier");

exports.signupService = async (data, file) => {
  const { name, email, phone, role, password } = data;

  const userExists = await User.findOne({ $or: [{ email }, { phone }] });

  if (userExists) {
    if (userExists.email === email) {
      throw new AppError("Email is already registered", StatusCodes.CONFLICT);
    } else if (userExists.phone === phone) {
      throw new AppError(
        "Phone number is already registered",
        StatusCodes.CONFLICT
      );
    } else {
      throw new AppError("User already exists", StatusCodes.CONFLICT);
    }
  }

  let profileUrl = "";
  if (file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "profiles",
          public_id: `${Date.now()}-${data.name}-${
            file.originalname.split(".")[0]
          }`,
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
    profileUrl = result.secure_url;
  }

  const newUser = new User({
    name,
    email,
    phone,
    role,
    password,
    profile: {
      profilePhoto: profileUrl,
      skills: [],
      bio: "",
      resume: "",
      resumeOriginalName: "",
      // company:{type:mongoose.Schema.Types.ObjectId ,ref: models.COMPANY},
    },
  });

  const user = await newUser.save();
  return user;
};

//Login User
exports.loginService = async (data) => {
  const { email, password, role } = data;

  const filter = {};
  if (email) filter.email = email;

  const user = await User.findOne(filter).select("+password");
  if (!user) {
    throw new AppError("User Not Found", StatusCodes.BAD_REQUEST);
  }

  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) {
    throw new AppError("Invalid Credentials", StatusCodes.UNAUTHORIZED);
  }

  if (user.role !== role) {
    throw new AppError("Current User Role is unmatch", StatusCodes.FORBIDDEN);
  }
  const token = jwt.sign(
    { id: user._id, role: user.role },
    serverConfig.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );

  return { token, user };
};
