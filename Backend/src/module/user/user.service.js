const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const User = require("../../model/user.model");
const { AppError } = require("../../utils/errorHandler");

exports.getProfile = async (userId) => {
  const user = await User.findById(userId).select("-__v");
  if (!user) throw new AppError("User not found", 404);
  return user;
};

exports.updateProfile = async (userId, updateData, file) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  if (file) {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "resumes",
          public_id: `${Date.now()}-${user.name}-${
            file.originalname.split(".")[0]
          }`,
          resource_type: "auto", 
          type: "upload", 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
    user.profile.resume = result.secure_url;
    user.profile.resumeOriginalName = file.originalname;
  }

  // ✅ Update top-level fields
  user.name = updateData.name || user.name;
  user.email = updateData.email || user.email;
  user.phone = updateData.phone || user.phone;

  // ✅ Update profile subfields (non-nested FormData)
  if (updateData.bio !== undefined) {
    user.profile.bio = updateData.bio;
  }

  if (updateData.skills) {
    // If coming as comma-separated string, convert to array
    user.profile.skills = Array.isArray(updateData.skills)
      ? updateData.skills
      : updateData.skills.split(",").map((skill) => skill.trim());
  }

  // You could also handle text resume URL separately
  if (updateData.resume) {
    user.profile.resume = updateData.resume;
  }

  const updatedUser = await user.save();
  return updatedUser;
};
